"use client"

import { cn } from "@/shared/lib"
import { buildBreadcrumbs } from "@/shared/lib/build-breadcrumbs"
import { RouteEntry } from "@/shared/model"
import { Typography } from "@/shared/ui"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"
import {
  PageHero,
  PageHeroBackground,
  PageHeroContent,
} from "@/shared/ui/page-hero"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { ComponentProps, useEffect, useMemo, useState } from "react"
import { BreadcrumbList as BreadcrumbListSchema, WithContext } from "schema-dts"

interface PageHeroProps {
  page: RouteEntry
  title?: string
  image?: string | StaticImport
}

const breadcrumbsList = (
  items?: RouteEntry[],
  baseUrl?: string
): WithContext<BreadcrumbListSchema> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items?.map((item, i) => ({
    "@type": "ListItem",
    position: i,
    name: item.title,
    item: baseUrl + item.path,
  })),
})

const PageHeroRoutes = ({
  page,
  title,
  image,
}: ComponentProps<"div"> & PageHeroProps) => {
  const [baseUrl, setBaseUrl] = useState<string | undefined>()
  const breadcrumbs = useMemo(() => buildBreadcrumbs(page), [page])

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])
  return (
    <PageHero height={50} initOffsetTop={195} aria-labelledby="page-title">
      <PageHeroBackground
        className={cn(
          "before:bg-(--color-brand) before:absolute before:size-full",
          image && "before:bg-black/20"
        )}
      >
        {image && (
          <Image
            src={image}
            alt="Image"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
          />
        )}
      </PageHeroBackground>
      <PageHeroContent className="@container flex flex-col justify-center items-center">
        <Typography asChild variant="h1">
          <h1 className="text-white text-center break-all @3xl:break-normal text-[clamp(2em,2.5vw,3em)]">
            <strong>{title || page.title}</strong>
          </h1>
        </Typography>
        <nav aria-label="breadcrumb" className="mt-4">
          <script
            id="breadcrumbs"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbsList(breadcrumbs, baseUrl)),
            }}
          />
          <Breadcrumb>
            {breadcrumbs && (
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="text-white hover:text-gray-200"
                  >
                    <Link href={breadcrumbs[0].path}>
                      <BreadcrumbPage className="text-white">
                        {breadcrumbs[0].title}
                      </BreadcrumbPage>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">
                    {page.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            )}
          </Breadcrumb>
        </nav>
      </PageHeroContent>
    </PageHero>
  )
}

export { PageHeroRoutes }
