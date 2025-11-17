// src/pages/api/contact.ts
export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ContactEmail from '@emails/ContactEmail';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  id?: string;
  error?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const honeypot = formData.get('website') as string | null;

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      const response: ApiResponse = { error: 'Invalid submission' };
      return new Response(
        JSON.stringify(response),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      const response: ApiResponse = { error: 'Missing required fields' };
      return new Response(
        JSON.stringify(response),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const response: ApiResponse = { error: 'Invalid email format' };
      return new Response(
        JSON.stringify(response),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Render email template
    const emailHtml = await render(ContactEmail({ name, email, message }));

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'MK <mail@mohankumar.dev>',
      to: ['mohansky@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: emailHtml,
      // Optional: Send a copy to the person who submitted
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      const response: ApiResponse = { error: 'Failed to send email' };
      return new Response(
        JSON.stringify(response),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const response: ApiResponse = { 
      success: true, 
      message: 'Email sent successfully',
      id: data?.id 
    };
    
    return new Response(
      JSON.stringify(response),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('API error:', error);
    const response: ApiResponse = { error: 'Internal server error' };
    return new Response(
      JSON.stringify(response),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};