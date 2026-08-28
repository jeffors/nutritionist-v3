import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from 'react-email'
import { BoxedTailwindConfig } from './theme'
import { EmailFonts } from './theme-fonts'

const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL
  ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}`
  : 'http://localhost:3000'

const textOnlyTitle = 'Новая заявка на консультацию'

interface TextOnlyEmailProps {
  url: string
  name: string
  phone: string
  email: string
  messenger: string
  request: string
}

export const ConsultationEmail = ({
  url,
  name,
  phone,
  email,
  messenger,
  request,
}: TextOnlyEmailProps) => (
  <Tailwind config={BoxedTailwindConfig}>
    <Html>
      <Head>
        <EmailFonts />
      </Head>

      <Body className="bg-bg-2 m-0 text-center font-sans">
        <Preview>Заявка на консультацию</Preview>
        <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-[640px]">
          <Section>
            <Section className="bg-bg mobile:px-2 px-6 py-4">
              <Section className="mb-3 px-6">
                <Row>
                  <Column className="w-1/2 py-[7px] align-middle">
                    <Row>
                      <Column className="w-[32px] align-middle">
                        <Img
                          src={`${baseUrl}/images/email/logo-email.png`}
                          alt=""
                          width={23}
                          className="block"
                        />
                      </Column>
                    </Row>
                  </Column>
                  <Column align="right" className="w-1/2 py-[7px] align-middle">
                    <Text className="font-13 m-0 text-right font-sans">
                      <span className="text-fg-3">Сайт нутрициолога</span>
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section className="bg-bg-2 mobile:px-6 mobile:py-12 rounded-4xl px-[40px] py-20 text-left">
                <Section className="mb-8">
                  <Heading as="h1" className="font-28 text-fg m-0 text-left font-sans">
                    {textOnlyTitle}
                  </Heading>
                </Section>

                <Text className="font-16 text-fg-2 mt-0  max-w-[420px] text-left font-sans ">
                  <strong>Имя:</strong> {name}
                </Text>
                <Text className="font-16 text-fg-2 mt-0  max-w-[420px] text-left font-sans ">
                  <strong>Телефон:</strong> {phone}
                </Text>
                <Text className="font-16 text-fg-2 mt-0  max-w-[420px] text-left font-sans ">
                  <strong>Email:</strong> {email}
                </Text>
                <Text className="font-16 text-fg-2 mt-0  max-w-[420px] text-left font-sans ">
                  <strong>Мессенджер:</strong> {messenger}
                </Text>
                <Text className="font-16 text-fg-2 mt-0 mb-6 max-w-[420px] text-left font-sans">
                  <strong>Запрос:</strong> {request}
                </Text>

                <Button
                  href={url}
                  className="bg-btn font-16 text-fg-inverted inline-block rounded-4xl px-7 py-4 text-center font-sans leading-6"
                >
                  Открыть заявку в админ-панели
                </Button>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

ConsultationEmail.PreviewProps = {
  url: 'https://example.com/',
  name: 'Анна',
  email: 'anna@test.com',
  messenger: 'WhatsApp',
  phone: '+7 (900) 123-45-67',
  request: 'Здравствуйте, хочу записать на консультацию',
} satisfies TextOnlyEmailProps

export default ConsultationEmail
