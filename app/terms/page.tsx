import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Pulse News",
  description: "Terms and conditions for using Pulse News website and services",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl space-y-8 py-6 md:py-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: April 3, 2025</p>
      </section>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Welcome to Pulse News. These Terms of Service ("Terms") govern your access to and use of our website, mobile
          applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be
          bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>

        <p>
          By accessing or using our Services, you agree to these Terms and our Privacy Policy. If you do not agree to
          these Terms, you may not access or use our Services.
        </p>

        <h2>2. Changes to Terms</h2>

        <p>
          We may modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms
          on our website and updating the "Last updated" date. Your continued use of our Services after such notice
          constitutes your acceptance of the new Terms.
        </p>

        <h2>3. Account Registration</h2>

        <p>To access certain features of our Services, you may need to create an account. You are responsible for:</p>

        <ul>
          <li>Providing accurate and complete information</li>
          <li>Maintaining the security of your account credentials</li>
          <li>All activities that occur under your account</li>
        </ul>

        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason at our
          discretion.
        </p>

        <h2>4. Content and Intellectual Property</h2>

        <p>
          Our Services contain content owned or licensed by Pulse News, including text, images, graphics, videos, and
          software ("Content"). The Content is protected by copyright, trademark, and other intellectual property laws.
        </p>

        <p>You may access and use the Content for personal, non-commercial purposes only. You may not:</p>

        <ul>
          <li>Reproduce, distribute, modify, or create derivative works of the Content</li>
          <li>Use the Content for commercial purposes without our express permission</li>
          <li>Remove any copyright, trademark, or other proprietary notices</li>
        </ul>

        <h2>5. User Content</h2>

        <p>
          You may have the opportunity to submit content to our Services, such as comments, reviews, or other materials
          ("User Content"). By submitting User Content, you:
        </p>

        <ul>
          <li>Retain ownership of your User Content</li>
          <li>
            Grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish,
            translate, and distribute your User Content
          </li>
          <li>Represent that you have all necessary rights to submit the User Content</li>
        </ul>

        <p>
          We reserve the right to remove any User Content that violates these Terms or that we find objectionable for
          any reason.
        </p>

        <h2>6. Prohibited Conduct</h2>

        <p>You agree not to:</p>

        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt our Services</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use our Services for any illegal or unauthorized purpose</li>
          <li>Harass, abuse, or harm another person</li>
          <li>Submit false or misleading information</li>
        </ul>

        <h2>7. Disclaimer of Warranties</h2>

        <p>
          OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT.
        </p>

        <h2>8. Limitation of Liability</h2>

        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, PULSE NEWS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF OUR SERVICES.
        </p>

        <h2>9. Indemnification</h2>

        <p>
          You agree to indemnify and hold harmless Pulse News and its officers, directors, employees, and agents from
          any claims, damages, liabilities, costs, or expenses arising out of your use of our Services or your violation
          of these Terms.
        </p>

        <h2>10. Governing Law</h2>

        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of New York, without
          regard to its conflict of law provisions.
        </p>

        <h2>11. Contact Information</h2>

        <p>If you have any questions about these Terms, please contact us at:</p>

        <p>
          Email: legal@pulsenews.com
          <br />
          Address: 123 News Avenue, Media District, New York, NY 10001
          <br />
          Phone: +1 (212) 555-1234
        </p>
      </div>
    </div>
  )
}

