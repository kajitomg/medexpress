import "@/app/styles/globals.css"
import { MainLayout } from "@/shared/ui"
import Footer from "@/widgets/footer"
import Header from "@/widgets/header"
import * as React from "react"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <MainLayout header={<Header />} footer={<Footer />} headerHeight={80}>
        {children}
      </MainLayout>
    </>
  )
}

export default RootLayout
