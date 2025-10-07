import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img, // Importer Img-komponenten
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'
import * as React from 'react'
import type { ServerContactFormData } from '@/db/zod/schemas/ServerContactFormSchema'

const UTK_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?
    process.env.NEXT_PUBLIC_SITE_URL
  : 'https://utekos.no'

export function ContactSubmissionEmail(
  props: ServerContactFormData
): React.JSX.Element {
  const { name, email, phone, country, orderNumber, message } = props
  const previewText = `Ny henvendelse fra ${name} via kontaktskjemaet`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            {/* Legg til logoen her */}
            <Img
              src={`${UTK_BASE_URL}/icon.png`} // Full URL til logoen
              width='48' // Juster bredde etter behov
              height='48' // Juster høyde etter behov
              alt='Utekos Logo'
              style={logoImg}
            />
            {/* <Heading as='h1' style={logo}>
              Utekos
            </Heading> */}{' '}
            {/* Valgfritt: Kommentert ut tekstlogo for å unngå duplisering med bilde */}
          </Section>

          <Section style={content}>
            <Heading as='h2' style={title}>
              Ny henvendelse fra kontaktskjema
            </Heading>
            <Text style={paragraph}>
              En ny henvendelse har blitt sendt inn via kontaktskjemaet på
              utekos.no.
            </Text>
          </Section>

          <Section style={detailsSection}>
            <Heading as='h3' style={subTitle}>
              Innsenders detaljer
            </Heading>
            <Text style={detailText}>
              <strong>Navn:</strong> {name}
            </Text>
            <Text style={detailText}>
              <strong>E-post:</strong>{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            {phone && (
              <Text style={detailText}>
                <strong>Telefon:</strong> {phone}
              </Text>
            )}
            <Text style={detailText}>
              <strong>Land:</strong> {country}
            </Text>
            {orderNumber && (
              <Text style={detailText}>
                <strong>Ordrenummer:</strong> {orderNumber}
              </Text>
            )}
          </Section>

          <Section style={messageSection}>
            <Heading as='h3' style={subTitle}>
              Melding
            </Heading>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Utekos. Alle rettigheter forbeholdt.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// --- Stiler for e-posten ---

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
  border: '1px solid #e6ebf1',
  borderRadius: '8px'
}

const header = {
  padding: '20px 40px',
  borderBottom: '1px solid #e6ebf1',
  textAlign: 'center' as const // Sentrerer logoen
}

const logoImg = {
  margin: '0 auto', // Sentrerer bildet
  display: 'block' as const // Nødvendig for margin: auto
}
const content = {
  padding: '30px 40px'
}

const title = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 15px'
}

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0'
}

const detailsSection = {
  padding: '0 40px'
}

const subTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '600',
  margin: '20px 0 10px'
}

const detailText = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '4px 0'
}

const messageSection = {
  backgroundColor: '#f6f9fc',
  margin: '20px 40px',
  padding: '20px',
  borderRadius: '6px',
  border: '1px solid #e6ebf1'
}

const messageText = {
  ...paragraph,
  whiteSpace: 'pre-wrap' as const
}

const link = {
  color: '#007bff',
  textDecoration: 'underline'
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '40px 0'
}

const footer = {
  padding: '0 40px'
}

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px'
}
