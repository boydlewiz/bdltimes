import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Pulse News",
  description: "Get in touch with the Pulse News team",
}

export default function ContactPage() {
  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-xl text-muted-foreground">Have a question, tip, or feedback? We'd love to hear from you.</p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <div className="grid gap-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    123 News Avenue, Media District
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@pulsenews.com" className="hover:underline">
                      contact@pulsenews.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+12125551234" className="hover:underline">
                      +1 (212) 555-1234
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg overflow-hidden h-[300px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573469443!2d-73.98823492404536!3d40.75889083646641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710530442023!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

