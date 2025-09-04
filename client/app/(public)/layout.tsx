import { fetchSettings } from "@/entities/settings/services"
import { CartProvider } from "@/features/cart/provider"
import { SettingsProvider } from "@/features/settings/provider"
import * as React from "react"

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const response = await fetchSettings()

  const data = response.data

  return (
    <SettingsProvider initialState={{ data }}>
      <CartProvider>{children}</CartProvider>
    </SettingsProvider>
  )
}

export default RootLayout
