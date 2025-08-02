import "@/app/styles/globals.css"
import { CartProvider } from "@/features/cart/provider"
import { Metadata } from "next"
import * as React from "react"

export const metadata: Metadata = {
  title: "Medexpress",
}
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}

export default RootLayout
