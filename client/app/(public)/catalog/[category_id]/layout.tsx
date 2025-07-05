import "@/app/styles/globals.css"
import { AsideLayout } from "@/shared/ui"
import { Aside } from "@/widgets/aside"
import Footer from "@/widgets/footer"
import Header from "@/widgets/header"
import * as React from "react"

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ category_id: string }>
}>) => {
  return (
    <>
      <AsideLayout
        header={<Header />}
        footer={<Footer />}
        aside={<Aside params={params} />}
        asideWidth={320}
        headerHeight={80}
      >
        {children}
      </AsideLayout>
    </>
  )
}

export default RootLayout
