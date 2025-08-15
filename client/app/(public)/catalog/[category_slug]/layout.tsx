import {
  PageLayout,
  PageLayoutAside,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { CatalogCategoriesNavigationSidebar } from "@/widgets/catalog-categories-navigation-sidebar/ui/catalog-categories-navigation-sidebar"
import { Footer } from "@/widgets/footer/ui"
import { Header } from "@/widgets/header/ui"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import Error from "../../../error"

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ category_slug: string }>
}>) => {
  const { category_slug } = await params

  return (
    <PageLayout>
      <PageLayoutHeader>
        <Header />
      </PageLayoutHeader>
      <PageLayoutAside
        initOffsetTop={128}
        className="hidden lg:block w-0 h-0 lg:w-auto lg:h-full"
      >
        <ErrorBoundary errorComponent={Error}>
          <CatalogCategoriesNavigationSidebar category_slug={category_slug} />
        </ErrorBoundary>
      </PageLayoutAside>
      <PageLayoutContent initOffsetTop={128} initOffsetLeft={320}>
        <PageLayoutMain>
          <ErrorBoundary errorComponent={Error}>{children}</ErrorBoundary>
        </PageLayoutMain>
        <PageLayoutFooter>
          <Footer />
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
  )
}

export default RootLayout
