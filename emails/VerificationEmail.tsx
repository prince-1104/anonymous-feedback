// emails/VerificationEmail.tsx
import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Your Verification Code</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
  
        <Preview>Here's your Mystery verification code: {otp}</Preview>
  
        <Section style={{ padding: '20px' }}>
          <Row>
            <Heading as="h2">Hi {username},</Heading>
          </Row>
  
          <Row>
            <Text>
              Thank you for registering with <strong>Mystery</strong>. Use the code below to verify your account:
            </Text>
          </Row>
  
          <Row>
            <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>{otp}</Text>
          </Row>
  
          <Row>
            <Text>If you didn’t request this code, you can safely ignore this email.</Text>
          </Row>
  
          {/* Optional: You can re-enable this for direct verification */}
          {/* <Row>
            <Button
              href={`https://yourdomain.com/verify/${username}`}
              style={{ backgroundColor: '#000', color: '#fff', padding: '12px 20px', borderRadius: '6px' }}
            >
              Verify Your Account
            </Button>
          </Row> */}
        </Section>
      </Html>
    );
  }
  