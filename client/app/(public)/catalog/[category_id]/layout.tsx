import {
  PageLayout,
  PageLayoutAside,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { Aside } from "@/widgets/aside/aside"
import { Footer } from "@/widgets/footer"
import { Header } from "@/widgets/header"
import * as React from "react"

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ category_id: string }>
}>) => {
  return (
    <PageLayout>
      <PageLayoutHeader>
        <Header />
      </PageLayoutHeader>
      <PageLayoutAside headerHeight={80}>
        <Aside params={params} />
      </PageLayoutAside>
      <PageLayoutContent headerHeight={80} asideWidth={320}>
        <PageLayoutMain>{children}</PageLayoutMain>
        <PageLayoutFooter>
          <Footer />
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
  )
}

export default RootLayout
