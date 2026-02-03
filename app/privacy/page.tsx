import { Heading } from '../components/heading'
import { Text } from '../components/text'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Heading level={1}>Privacy Policy</Heading>
      <Text className="mt-6 text-zinc-600 dark:text-zinc-400">
        Last updated: February 3, 2026
      </Text>

      <div className="mt-10 space-y-8">
        <section>
          <Heading level={2}>1. Introduction</Heading>
          <Text className="mt-4">
            Welcome to the Jamaica Traffic Ticket Dashboard ("we," "our," or "the Service"). We are committed to
            protecting your personal information and your right to privacy. This Privacy Policy explains what information
            we collect, how we use it, and your rights regarding that information.
          </Text>
        </section>

        <section>
          <Heading level={2}>2. Information We Collect</Heading>
          <Text className="mt-4">
            We collect the following types of information:
          </Text>

          <div className="mt-6 space-y-4">
            <div>
              <Heading level={3} className="text-base font-semibold">Personal Information</Heading>
              <ul className="mt-2 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Email address (when you create an account)</li>
                <li>Name and profile information (via Google OAuth)</li>
                <li>License plate numbers you provide for ticket lookup</li>
              </ul>
            </div>

            <div>
              <Heading level={3} className="text-base font-semibold">Traffic Violation Data</Heading>
              <ul className="mt-2 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>Ticket numbers and violation details</li>
                <li>Outstanding balances and payment status</li>
                <li>Demerit points associated with violations</li>
                <li>Vehicle registration information</li>
              </ul>
            </div>

            <div>
              <Heading level={3} className="text-base font-semibold">Technical Information</Heading>
              <ul className="mt-2 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and analytics</li>
                <li>Push notification subscriptions (if enabled)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <Heading level={2}>3. How We Use Your Information</Heading>
          <Text className="mt-4">
            We use your information to:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Provide and maintain the Service</li>
            <li>Query official databases for your traffic violation records</li>
            <li>Display your traffic ticket information in a user-friendly format</li>
            <li>Send you notifications about new tickets or updates (if enabled)</li>
            <li>Improve and personalize your experience</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>4. Data Storage and Security</Heading>
          <Text className="mt-4">
            We take the security of your data seriously:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Your data is stored in secure databases with encryption</li>
            <li>We use industry-standard security measures to protect your information</li>
            <li>Access to your data is restricted to authorized personnel only</li>
            <li>We regularly review and update our security practices</li>
          </ul>
          <Text className="mt-4">
            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to
            use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
          </Text>
        </section>

        <section>
          <Heading level={2}>5. Data Sharing and Disclosure</Heading>
          <Text className="mt-4">
            We do not sell your personal information. We may share your information with:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><strong>Government Agencies</strong>: To retrieve your traffic violation records from official databases</li>
            <li><strong>Service Providers</strong>: Third-party vendors who assist us in operating the Service</li>
            <li><strong>Legal Requirements</strong>: When required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>6. OCR and Image Processing</Heading>
          <Text className="mt-4">
            Our Service uses Optical Character Recognition (OCR) technology to extract license plate information from images you provide:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Images are processed temporarily to extract text</li>
            <li>We do not permanently store license plate images unless you choose to save them</li>
            <li>OCR processing may be done locally on your device or through cloud services</li>
            <li>Extracted data is used solely for ticket lookup purposes</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>7. Your Privacy Rights</Heading>
          <Text className="mt-4">
            You have the right to:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><strong>Access</strong>: Request a copy of the personal data we hold about you</li>
            <li><strong>Correction</strong>: Request correction of inaccurate or incomplete data</li>
            <li><strong>Deletion</strong>: Request deletion of your personal data</li>
            <li><strong>Opt-Out</strong>: Unsubscribe from promotional communications</li>
            <li><strong>Data Portability</strong>: Request a copy of your data in a machine-readable format</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>8. Cookies and Tracking Technologies</Heading>
          <Text className="mt-4">
            We use cookies and similar tracking technologies to track activity on our Service and hold certain information:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Essential cookies for authentication and security</li>
            <li>Analytics cookies to understand how you use the Service</li>
            <li>Preference cookies to remember your settings</li>
          </ul>
          <Text className="mt-4">
            You can configure your browser to refuse cookies, but some features of the Service may not function properly.
          </Text>
        </section>

        <section>
          <Heading level={2}>9. Progressive Web App (PWA) Features</Heading>
          <Text className="mt-4">
            If you install our Progressive Web App:
          </Text>
          <ul className="mt-4 ml-6 list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>The app may store data locally on your device for offline access</li>
            <li>Push notifications require your explicit consent</li>
            <li>You can uninstall the app at any time from your device</li>
            <li>Local data will be cleared when you uninstall the app</li>
          </ul>
        </section>

        <section>
          <Heading level={2}>10. Children's Privacy</Heading>
          <Text className="mt-4">
            Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children. If you believe we have collected information from a child, please contact us
            immediately.
          </Text>
        </section>

        <section>
          <Heading level={2}>11. Changes to This Privacy Policy</Heading>
          <Text className="mt-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy
            Policy periodically for any changes.
          </Text>
        </section>

        <section>
          <Heading level={2}>12. Contact Us</Heading>
          <Text className="mt-4">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </Text>
          <Text className="mt-2">
            Email: traffic@jamaica.gov.jm
            <br />
            Address: Jamaica Traffic Authority
          </Text>
        </section>

        <section>
          <Heading level={2}>13. Data Retention</Heading>
          <Text className="mt-4">
            We retain your personal data for as long as necessary to provide the Service and fulfill the purposes
            outlined in this Privacy Policy. We may also retain and use your data to comply with legal obligations,
            resolve disputes, and enforce our agreements.
          </Text>
        </section>
      </div>
    </div>
  )
}
