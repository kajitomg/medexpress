"use client"

import { cn } from "@/shared/lib"
import { buildBreadcrumbs } from "@/shared/lib/build-breadcrumbs"
import { RouteEntry } from "@/shared/model"
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
import { ComponentProps, useMemo } from "react"

interface PageHeroProps {
  page: RouteEntry
  image?: string | StaticImport
}

const PageHeroRoutes = ({
  page,
  image,
}: ComponentProps<"div"> & PageHeroProps) => {
  const breadcrumbs = useMemo(() => buildBreadcrumbs(page), [page])
  return (
    <PageHero height={50} aria-labelledby="page-title">
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
      <PageHeroContent className="flex flex-col justify-center items-center">
        <h1 className="max-w-7xl cursor-default text-3xl sm:text-4xl lg:text-5xl hover:scale-102 text-white transition-transform duration-200 text-center">
          <strong>{page.title}</strong>
        </h1>
        <nav aria-label="breadcrumb" className="mt-4">
          <Breadcrumb>
            {breadcrumbs && (
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    asChild
                    className="text-white hover:text-gray-200"
                  >
                    <Link href={breadcrumbs[0].path}>
                      {breadcrumbs[0].title}
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
