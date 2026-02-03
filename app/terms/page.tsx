import { Heading } from '../components/heading'
import { Text } from '../components/text'

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Heading level={1}>Terms of Service</Heading>
      <Text className="mt-6 text-zinc-600 dark:text-zinc-400">
        Last updated: February 3, 2026
      </Text>

      <div className="mt-10 space-y-8">
        <section>
          <Heading level={2}>1. Acceptance of Terms</Heading>
          <Text className="mt-4">
            By accessing and using the Jamaica Traffic Ticket Dashboard ("the Service"), you accept and agree to be bound
            by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </Text>
        </section>

        <section>
          <Heading level={2}>2. Description of Service</Heading>
          <Text className="mt-4">
            The Service provides a platform for users to track and manage traffic violation tickets issued by Jamaican
            authorities. The Service uses license plate recognition technology and integrates with official government
            databases to retrieve ticket information.
          </Text>
        </section>

        <section>
          <Heading level={2}>3. User Accounts</Heading>
          <Text className="mt-4">
            You may be required to create an account to access certain features of the Service. You are responsible for:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Ensuring your account information is accurate and up-to-date</li>
            <li>Notifying us immediately of any unauthorized use of your account</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>4. Data Collection and Use</Heading>
          <Text className="mt-4">
            By using the Service, you consent to:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Collection of your license plate information for ticket lookup purposes</li>
            <li>Storage of your traffic violation data within the Service</li>
            <li>Use of OCR technology to extract information from license plate images</li>
          </ul>
          <Text className="mt-4">
            For more details on how we handle your data, please refer to our <a href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">Privacy Policy</a>.
          </Text>
        </section>

        <section>
          <Heading level={2}>5. Acceptable Use</Heading>
          <Text className="mt-4">
            You agree not to:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the Service or its related systems</li>
            <li>Use automated systems to access the Service without our express written permission</li>
            <li>Misrepresent your identity or affiliation with any person or organization</li>
            <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>6. Disclaimer of Warranties</Heading>
          <Text className="mt-4">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            We do not warrant that:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>The Service will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The Service is free of viruses or other harmful components</li>
            <li>The results obtained from the use of the Service will be accurate or reliable</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>7. Limitation of Liability</Heading>
          <Text className="mt-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
          </Text>
        </section>

        <section>
          <Heading level={2}>8. Changes to Terms</Heading>
          <Text className="mt-4">
            We reserve the right to modify these terms at any time. We will notify users of any material changes by
            posting the new Terms of Service on this page. Your continued use of the Service after such modifications
            constitutes your acceptance of the updated terms.
          </Text>
        </section>

        <section>
          <Heading level={2}>9. Governing Law</Heading>
          <Text className="mt-4">
            These Terms shall be governed by and construed in accordance with the laws of Jamaica, without regard to its
            conflict of law provisions.
          </Text>
        </section>

        <section>
          <Heading level={2}>10. Contact Information</Heading>
          <Text className="mt-4">
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            Email: traffic@jamaica.gov.jm
          </Text>
        </section>
      </div>
    </div>
  )
}
