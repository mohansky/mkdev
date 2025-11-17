import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Link } from "@react-email/components";
import * as React from 'react';

interface ContactEmailProps {
	name: string;
	email: string;
	message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>New contact form submission from {name}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>New Contact Form Submission</Heading>

					<Section style={section}>
						<Text style={label}>Name:</Text>
						<Text style={value}>{name}</Text>
					</Section>

					<Hr style={hr} />

					<Section style={section}>
						<Text style={label}>Email:</Text>
						<Text style={value}>{email}</Text>
					</Section>

					<Hr style={hr} />

					<Section style={section}>
						<Text style={label}>Message:</Text>
						<Text style={messageText}>{message}</Text>
					</Section>

					<Hr style={hr} />

					<Text style={footer}>This email was sent from your portfolio contact form.</Text>
					<Link style={footerLink} href=" https://mohankumar.dev/">mohankumar.dev</Link>
				</Container>
			</Body>
		</Html>
	);
};

export default ContactEmail;

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px",
	maxWidth: "600px",
};

const h1 = {
	color: "#1f2937",
	fontSize: "28px",
	fontWeight: "700",
	margin: "40px 0",
	padding: "0 48px",
};

const section = {
	padding: "0 48px",
};

const label = {
	color: "#6b7280",
	fontSize: "14px",
	fontWeight: "600",
	margin: "16px 0 8px",
	textTransform: "uppercase" as const,
	letterSpacing: "0.05em",
};

const value = {
	color: "#1f2937",
	fontSize: "16px",
	lineHeight: "24px",
	margin: "0 0 8px",
};

const messageText = {
	color: "#1f2937",
	fontSize: "16px",
	lineHeight: "28px",
	margin: "0 0 16px",
	whiteSpace: "pre-wrap" as const,
};

const hr = {
	borderColor: "#e5e7eb",
	margin: "20px 0",
};

const footer = {
	color: "#9ca3af",
	fontSize: "12px",
	lineHeight: "16px",
	padding: "0 48px",
	marginTop: "32px",
};

const footerLink = {
	color: "#1f2937",
	textDecoration: "underline",
  alignSelf: "center",
};