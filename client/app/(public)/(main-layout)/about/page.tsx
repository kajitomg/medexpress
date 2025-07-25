import { AboutPage } from "@/pages/about/ui"
import { ContactFormModeProvider } from "@/widgets/contact-form/provider"
import * as React from "react"

const About = () => {
  return (
    <ContactFormModeProvider>
      <AboutPage />
    </ContactFormModeProvider>
  )
}

export default About
