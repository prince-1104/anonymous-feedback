// lib/mail/sendVerificationEmail.ts
import { resend } from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '../../types/ApiResponse';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'no-reply@doptonin.in', 
      to: email,
      subject: 'Your Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: 'Verification email sent successfully.',
    };
  } catch (error: unknown) {
    // Optional: log error details in dev or send to monitoring in prod
    console.error('Error sending verification email:', error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === 'development'
          ? 'Failed to send verification email. Check server logs.'
          : 'Unable to send email. Please try again later.',
    };
  }
}
