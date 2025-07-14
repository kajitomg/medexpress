"use client"

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
import Link from "next/link"
import * as React from "react"
import { ComponentProps, useMemo } from "react"

interface PageHeroProps {
  page: RouteEntry
}

const PageHero = ({ page }: ComponentProps<"div"> & PageHeroProps) => {
  const breadcrumbs = useMemo(() => buildBreadcrumbs(page), [page])
  return (
    <header
      aria-labelledby="page-title"
      className="relative flex flex-col justify-center items-center h-50"
    >
      <h1 className="cursor-default text-5xl hover:scale-102 transition-transform duration-200">
        <strong>{page.title}</strong>
      </h1>
      <nav aria-label="breadcrumb" className="mt-4">
        <Breadcrumb>
          {breadcrumbs && (
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={breadcrumbs[0].path}>{breadcrumbs[0].title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{page.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          )}
        </Breadcrumb>
      </nav>
    </header>
  )
}

export { PageHero }
