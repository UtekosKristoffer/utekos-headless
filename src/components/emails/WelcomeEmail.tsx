/* eslint-disable quotes */
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind
} from '@react-email/components'
import * as React from 'react'

interface WelcomeEmailProps {
  email?: string
  discountCode?: string
}

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : ''

export const WelcomeEmail = ({
  email,
  discountCode = 'VELKOMMEN10'
}: WelcomeEmailProps) => {
  const previewText = `Velkommen til Utekos! Her er din rabattkode.`

  return (
    <Html>
      {/* VIKTIG ENDRING: Tailwind må pakke inn Head for å støtte hover/media queries */}
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: {
                  DEFAULT: '#3c5e4b',
                  light: '#e8edea',
                  dark: '#2a4234'
                },
                text: {
                  DEFAULT: '#333333',
                  muted: '#666666'
                }
              }
            }
          }
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>
        <Body className='bg-gray-100 my-auto mx-auto font-sans'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px] bg-white'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/icon.png`}
                width='60'
                height='60'
                alt='Utekos Logo'
                className='my-0 mx-auto'
              />
            </Section>
            <Heading className='text-text text-[24px] font-normal text-center p-0 my-[30px] mx-0'>
              Velkommen til <span className='font-bold text-brand'>Utekos</span>
              -familien!
            </Heading>

            <Text className='text-text text-[16px] leading-[24px] text-center'>
              Vi er utrolig glade for at du vil følge oss. Nå er du den første
              til å få vite om produktnyheter, inspirasjon til uteplassen og
              eksklusive tilbud.
            </Text>
            <Section className='bg-brand-light rounded-lg p-6 my-8 text-center mx-auto'>
              <Text className='text-brand-dark font-medium text-[16px] m-0 mb-2'>
                Som en takk for at du meldte deg på, får du 10% rabatt på ditt
                første kjøp:
              </Text>
              <Heading
                as='h2'
                className='text-brand text-[32px] font-bold tracking-wider my-4 mx-0 border-2 border-dashed border-brand-dark/30 inline-block py-2 px-6 rounded bg-white'
              >
                {discountCode}
              </Heading>
              <Text className='text-text-muted text-[14px] m-0 mt-2'>
                Bruk koden i kassen. Gyldig i 30 dager.
              </Text>
            </Section>
            <Section className='text-center my-[32px]'>
              <Button
                className='bg-brand hover:bg-brand-dark text-white rounded-md text-[16px] font-semibold no-underline text-center px-8 py-4 w-full sm:w-auto'
                href={`${baseUrl}/collections/all`}
              >
                Utforsk nettbutikken
              </Button>
            </Section>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />

            <Section>
              <Row>
                <Column className='align-top pl-4 w-1/2 border-r border-gray-200 pr-4'>
                  <Heading
                    as='h3'
                    className='text-[16px] font-bold m-0 mb-2 text-brand-dark'
                  >
                    Inspirasjon
                  </Heading>
                  <Text className='text-[14px] text-text-muted m-0'>
                    Tips og triks for å skape den perfekte uteplassen, uansett
                    årstid.
                  </Text>
                </Column>
                <Column className='align-top pl-4 w-1/2'>
                  <Heading
                    as='h3'
                    className='text-[16px] font-bold m-0 mb-2 text-brand-dark'
                  >
                    Eksklusiv tilgang
                  </Heading>
                  <Text className='text-[14px] text-text-muted m-0'>
                    Våre abonnenter får ofte tilgang til salg og nyheter før
                    alle andre.
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Section className='text-center'>
              <Text className='text-text-muted text-[12px] leading-[20px]'>
                Du mottar denne e-posten fordi du meldte deg på nyhetsbrevet
                vårt på Utekos.no.
              </Text>
              <Text className='text-text-muted text-[12px] leading-[20px]'>
                <Link
                  href={`${baseUrl}/privacy-policy`}
                  className='text-text-muted underline'
                >
                  Personvernerklæring
                </Link>
              </Text>
              <Text className='text-text-muted text-[12px] leading-[20px] mt-4'>
                © {new Date().getFullYear()} Utekos AS. Alle rettigheter
                reservert.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
