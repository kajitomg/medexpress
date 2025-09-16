import { fetchFooter } from "@/entities/footer/services"
import { fetchGlobal } from "@/entities/global/services"
import { fetchHeader } from "@/entities/header/services"
import { CartProvider } from "@/features/cart/provider"
import { FooterProvider } from "@/features/footer/provider"
import { GlobalProvider } from "@/features/global/provider"
import { HeaderProvider } from "@/features/header/provider"
import * as React from "react"

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const responseGlobal = await fetchGlobal()
  const responseHeader = await fetchHeader()
  const responseFooter = await fetchFooter()

  const global = responseGlobal.data
  const header = responseHeader.data
  const footer = responseFooter.data

  return (
    <GlobalProvider initialState={{ data: global }}>
      <HeaderProvider initialState={{ sections: header.sections }}>
        <FooterProvider initialState={{ sections: footer.sections }}>
          <CartProvider>{children}</CartProvider>
        </FooterProvider>
      </HeaderProvider>
    </GlobalProvider>
  )
}

export default RootLayout
