import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
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

interface PasswordResetEmailProps {
  url: string
}

export const PasswordResetEmail = ({ url }: PasswordResetEmailProps) => (
  <Tailwind config={BoxedTailwindConfig}>
    <Html>
      <Head>
        <EmailFonts />
      </Head>

      <Body className="bg-bg-2 m-0 text-center font-sans">
        <Preview>Сброс пароля</Preview>
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

              <Section className="bg-bg-2 mobile:px-6 mobile:py-12 rounded-4xl px-[40px] py-[64px] text-center">
                <Section className="mb-3">
                  <Img
                    src={`${baseUrl}/images/email/logo-email.png`}
                    alt="Logo"
                    width={48}
                    className="mx-auto mb-5 block"
                  />
                  <Heading as="h1" className="font-28 text-fg m-0 font-sans">
                    Сброс вашего пароля
                  </Heading>
                </Section>

                <Text className="font-16 text-fg-2 mx-auto mt-0 mb-8 max-w-[380px] text-center font-sans">
                  Вы получили это сообщение, потому что вы (или кто-то другой) запросили сброс
                  пароля для вашей учетной записи. Пожалуйста, нажмите на следующую кнопку, чтобы
                  завершить процесс:
                </Text>

                <Section className="mb-6 text-center">
                  <Button
                    href={url}
                    className="bg-btn font-16 text-fg-inverted inline-block rounded-4xl px-7 py-4 text-center font-sans leading-6"
                  >
                    Сменить пароль
                  </Button>
                </Section>

                <Text className="font-13 text-fg-3 mx-auto mt-8 mb-0 max-w-[400px] text-center font-sans">
                  Если вы не запрашивали этого, пожалуйста, проигнорируйте это письмо, и ваш пароль
                  останется неизменным.
                </Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
)

PasswordResetEmail.PreviewProps = {
  url: 'https://example.com/',
} satisfies PasswordResetEmailProps

export default PasswordResetEmail
