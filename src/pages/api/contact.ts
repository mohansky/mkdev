// src/pages/api/contact.ts
export const prerender = false;
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
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
    const company = formData.get('company') as string | null;
    const message = formData.get('message') as string;

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'MK <mail@mohankumar.dev>',
      to: ['mohansky@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not provided'}
        Message: ${message}
      `,
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