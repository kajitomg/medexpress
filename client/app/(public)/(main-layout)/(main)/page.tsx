import { MainPage } from "@/pages/main/ui/main-page"
import { ContactFormModeProvider } from "@/widgets/contact-form/provider"
import * as React from "react"

const Home = async () => {
  return (
    <ContactFormModeProvider>
      <MainPage />
    </ContactFormModeProvider>
  )
}

export default Home
