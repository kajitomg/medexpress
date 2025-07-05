import * as React from "react"

const AsideLayout = ({
  children,
  header,
  footer,
  aside,
  headerHeight,
  asideWidth,
}: Readonly<{
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
  aside: React.ReactNode
  headerHeight: number
  asideWidth: number
}>) => {
  return (
    <div className="w-full h-full min-h-[100vh] flex flex-col">
      <section id="header-section" className="z-50 fixed w-full">
        {header}
      </section>
      <section
        id="aside-section"
        className="fixed h-[100vh]"
        style={{ paddingTop: `${headerHeight}px` }}
      >
        {aside}
      </section>
      <section
        id="content-section"
        className="flex flex-col flex-auto"
        style={{
          marginTop: `${headerHeight}px`,
          marginLeft: `${asideWidth}px`,
        }}
      >
        <main id="main-section" className="flex-auto">
          {children}
        </main>
        <section id="footer-section">{footer}</section>
      </section>
    </div>
  )
}

export { AsideLayout }
