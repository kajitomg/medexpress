import "@/app/styles/globals.css"
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { Footer } from "@/widgets/footer"
import { Header } from "@/widgets/header"
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
      <PageLayoutContent headerHeight={80}>
        <PageLayoutMain>{children}</PageLayoutMain>
        <PageLayoutFooter>
          <Footer />
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
    /* <>
       <MainLayout header={<Header />} footer={<Footer />} headerHeight={80}>
         {children}
       </MainLayout>
     </>*/
  )
}

export default RootLayout
