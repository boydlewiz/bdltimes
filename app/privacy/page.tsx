import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Pulse News",
  description: "Privacy policy for Pulse News website and services",
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl space-y-8 py-6 md:py-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: April 3, 2025</p>
      </section>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          At Pulse News, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website or use our services.
        </p>

        <h2>Information We Collect</h2>

        <p>
          We collect information that you provide directly to us, such as when you create an account, subscribe to our
          newsletter, contact us, or participate in surveys or promotions. This may include:
        </p>

        <ul>
          <li>Personal information (name, email address, phone number)</li>
          <li>Account credentials</li>
          <li>Payment information</li>
          <li>Communication preferences</li>
          <li>Survey responses and feedback</li>
        </ul>

        <p>We also automatically collect certain information when you visit our website, including:</p>

        <ul>
          <li>Device information (browser type, operating system)</li>
          <li>IP address and location data</li>
          <li>Pages visited and time spent on our site</li>
          <li>Referral sources</li>
          <li>Cookies and similar technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>

        <p>We use the information we collect for various purposes, including:</p>

        <ul>
          <li>Providing and maintaining our services</li>
          <li>Processing transactions and subscriptions</li>
          <li>Personalizing your experience</li>
          <li>Sending newsletters and marketing communications</li>
          <li>Responding to your inquiries and requests</li>
          <li>Improving our website and services</li>
          <li>Analyzing usage patterns and trends</li>
          <li>Protecting against fraudulent or unauthorized activity</li>
        </ul>

        <h2>Sharing Your Information</h2>

        <p>We may share your information with:</p>

        <ul>
          <li>Service providers who perform services on our behalf</li>
          <li>Business partners with your consent</li>
          <li>Legal authorities when required by law</li>
          <li>In connection with a business transaction (merger, acquisition, etc.)</li>
        </ul>

        <h2>Your Choices</h2>

        <p>You have several choices regarding the information we collect and how it's used:</p>

        <ul>
          <li>Account Information: You can update your account information at any time</li>
          <li>Marketing Communications: You can opt out of receiving promotional emails</li>
          <li>Cookies: You can manage cookie preferences through your browser settings</li>
          <li>Do Not Track: We honor Do Not Track signals from browsers</li>
        </ul>

        <h2>Data Security</h2>

        <p>
          We implement appropriate technical and organizational measures to protect your personal information. However,
          no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee
          absolute security.
        </p>

        <h2>Children's Privacy</h2>

        <p>
          Our services are not intended for individuals under the age of 13. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2>Contact Us</h2>

        <p>If you have any questions about this Privacy Policy, please contact us at:</p>

        <p>
          Email: privacy@pulsenews.com
          <br />
          Address: 123 News Avenue, Media District, New York, NY 10001
          <br />
          Phone: +1 (212) 555-1234
        </p>
      </div>
    </div>
  )
}

