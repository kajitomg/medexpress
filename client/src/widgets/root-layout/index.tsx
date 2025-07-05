"use client"

import Footer from "@/widgets/footer"
import Header from "@/widgets/header"
import { Inter } from "next/font/google"
import * as React from "react"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--ff-inter",
})

const RootLayoutImpl = (props) => {
  return (
    <body className={`${inter.variable} ${inter.className}`}>
      <Header className="z-50 absolute w-full" />
      <div className="pt-20">{props.children}</div>
      <Footer />
    </body>
  )
}

export default RootLayoutImpl
