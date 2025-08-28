import "@/application/styles/globals.css"
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutMain,
} from "@/shared/ui/page-layout"
import { Footer } from "@/widgets/footer/ui"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import * as React from "react"
import Error from "../../../error"

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <PageLayout>
      <PageLayoutContent initOffsetTop={128}>
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
