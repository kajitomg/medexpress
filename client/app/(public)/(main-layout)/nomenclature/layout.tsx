import { NomenclatureOptionsProvider } from "@/features/nomenclature/provider"
import * as React from "react"

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return <NomenclatureOptionsProvider>{children}</NomenclatureOptionsProvider>
}

export default RootLayout
