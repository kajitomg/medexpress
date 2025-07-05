import * as React from "react"

const MainLayout = ({
  children,
  header,
  footer,
  headerHeight,
}: Readonly<{
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  headerHeight: number
}>) => {
  return (
    <div className="relative w-full h-full min-h-[100vh] flex flex-col">
      <section id="header-section" className="z-50 fixed w-full">
        {header}
      </section>
      <main
        id="main-section"
        className="flex-auto"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        {children}
      </main>
      <section id="footer-section">{footer}</section>
    </div>
  )
}

export { MainLayout }
