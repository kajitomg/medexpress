import "@/app/styles/globals.css"
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { Footer } from "@/widgets/footer/ui"
import { Header } from "@/widgets/header/ui"
import * as React from "react"

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <PageLayout>
      <PageLayoutHeader>
        <Header />
      </PageLayoutHeader>
      <PageLayoutContent headerHeight={128}>
        <PageLayoutMain>{children}</PageLayoutMain>
        <PageLayoutFooter>
          <Footer />
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
  )
}

export default RootLayout
