"use client"

import { fetchCatalogCategoriesList } from "@/entities/category/services"
import {
  useCatalogOptionsStore,
  useCategoriesListStore,
} from "@/features/catalog/provider"
import { CatalogSearchControl } from "@/features/catalog/ui"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { CategoriesList } from "@/views/catalog-categories/ui/categories-list"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"

import * as React from "react"
import { useCallback } from "react"

const Page = () => {
  const categories = useCategoriesListStore((state) => state.categories)
  const loadCategories = useCategoriesListStore((state) => state.loadCategories)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  const fetchCategories = useCallback(() => {
    return fetchCatalogCategoriesList(searchQuery)
  }, [searchQuery])

  useUpdateEffect(() => {
    loadCategories(fetchCategories)
  }, [loadCategories, fetchCategories])

  return (
    <>
      <PageHeroRoutes page={routes.CATALOG()} />
      <ContentSection>
        <ContentSectionContent className="max-w-440 w-full">
          <CatalogSearchControl />

          {categories?.length ? (
            <CategoriesList categories={categories} className="mt-6" />
          ) : (
            <EmptyState title="Категории не найдены" />
          )}
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { Page }
