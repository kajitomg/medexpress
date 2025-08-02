import { CatalogOptionsProvider } from "@/features/catalog/provider"
import {
  PageLayout,
  PageLayoutAside,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { Aside } from "@/widgets/aside/ui/aside"
import { Footer } from "@/widgets/footer/ui"
import { Header } from "@/widgets/header/ui"
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

      <PageLayoutAside headerHeight={128}>
        <CatalogOptionsProvider>
          <Aside params={params} />
        </CatalogOptionsProvider>
      </PageLayoutAside>
      <PageLayoutContent headerHeight={128} asideWidth={320}>
        <PageLayoutMain>{children}</PageLayoutMain>
        <PageLayoutFooter>
          <Footer />
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
  )
}

export default RootLayout
