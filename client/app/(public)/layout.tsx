import "@/application/styles/globals.css"
import { fetchGlobal } from "@/entities/global/services"
import { CartProvider } from "@/features/cart/provider"
import { GlobalProvider } from "@/features/global/provider"
import { Toaster } from "@/shared/ui/sonner"
import * as React from "react"

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const responseGlobal = await fetchGlobal()

  const global = responseGlobal.data
  return (
    <GlobalProvider initialState={{ data: global }}>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </GlobalProvider>
  )
}

export default RootLayout
