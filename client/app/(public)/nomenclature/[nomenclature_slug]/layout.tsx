import { fetchFooter } from "@/entities/footer/services"
import { fetchHeader } from "@/entities/header/services"
import { fetchPage } from "@/entities/page/services"
import { SectionsProvider } from "@/features/sections/provider"
import { generatePageMetadata } from "@/shared/lib/generate-page-metadata"
import { generateSeoViewport } from "@/shared/lib/generate-seo-viewport"
import {
  PageLayout,
  PageLayoutAside,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { NomenclatureTypesNavigationSidebar } from "@/widgets/catalog-categories-navigation-sidebar/ui/nomenclature-types-navigation-sidebar"
import { Footer } from "@/widgets/footer/ui"
import { Header } from "@/widgets/header/ui"
import { NaivgationSidebarSheet } from "@/widgets/navigation-sidebar-sheet/ui"
import { Metadata, Viewport } from "next"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import slugify from "slugify"
import Error from "../../../error"

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetchPage(
    slugify("Элемент каталога", { lower: true, strict: true })
  )

  const data = response.data

  return generatePageMetadata(data)
}

export async function generateViewport(): Promise<Viewport | string> {
  const response = await fetchPage(
    slugify("Элемент каталога", { lower: true, strict: true })
  )
  const data = response.data

  return generateSeoViewport(data)
}

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ nomenclature_slug: string }>
}>) => {
  const { nomenclature_slug } = await params
  const responseHeader = await fetchHeader()
  const responseFooter = await fetchFooter()

  const header = responseHeader.data
  const footer = responseFooter.data

  return (
    <PageLayout>
      <PageLayoutHeader>
        <SectionsProvider initialState={{ sections: header.sections }}>
          <Header />
        </SectionsProvider>
      </PageLayoutHeader>
      <PageLayoutAside
        initOffsetTop={128}
        className="hidden lg:block w-0 h-0 lg:w-auto lg:h-full"
      >
        <ErrorBoundary errorComponent={Error}>
          <NomenclatureTypesNavigationSidebar
            category_slug={nomenclature_slug}
          />
        </ErrorBoundary>
      </PageLayoutAside>
      <PageLayoutContent initOffsetTop={196} initOffsetLeft={320}>
        <PageLayoutMain>
          <ErrorBoundary errorComponent={Error}>
            <NaivgationSidebarSheet category_slug={nomenclature_slug} />
          </ErrorBoundary>
          <ErrorBoundary errorComponent={Error}>{children}</ErrorBoundary>
        </PageLayoutMain>
        <PageLayoutFooter>
          <SectionsProvider initialState={{ sections: footer.sections }}>
            <Footer />
          </SectionsProvider>
        </PageLayoutFooter>
      </PageLayoutContent>
    </PageLayout>
  )
}

export default RootLayout
