import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

type EmailTemplateProps = {
  otp: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  otp,
}) => (
  <Html>
    <Head />
    {/* <Preview>Apple Receipt</Preview> */}

      <Body>
      <Tailwind>
        <Container className='w-[450px]'>
          <Section className='flex justify-between items-center'>
            <Column>
              <Img
                src="../../../../../../public/amazon-logo.jpg"
                width="100"
                height="100"
                alt="Amazon"
              />
            </Column>

            <Column>
              <Text>Password Assistance</Text>
            </Column>
          </Section>

          <Section className='w-full'>
            <Hr className='w-full'/>
          </Section>

          <Section className='flex justify-start'>
            <Text className='text-[red]'>
              To authenticate, please use the following One Time Password (OTP):
            </Text>
          </Section>

          <Section>
            <Text>{otp}</Text>
          </Section>

          <Section>
            <Text>Don&apos;t share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</Text>
          </Section>

          <Section>
            <Text>We hope to see you again soon.</Text>
          </Section>

        </Container>
    </Tailwind>
      </Body>
  </Html>
  // <div className='w-[360px] flex flex-col'>
  //   <div className='flex w-full justify-between item-center'>
  //     <Image src={amazon} alt="Amazon" height={100} width={100} />
  //     <span>Password Assistance</span>
  //   </div>
  //   <div className='flex flex-col items-start'>
  //     <span className='text-13 text-[#500050]'>To authenticate, please use the following One Time Password (OTP):</span>
  //     <span className='font-bold'>{otp}</span>
  //     <span>Don&apos;t share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</span>
  //     <span>We hope to see you again soon.</span>
  //   </div>
  // </div>
)