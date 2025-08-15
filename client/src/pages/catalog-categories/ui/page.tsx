"use client"

import { fetchCatalogCategoriesList } from "@/entities/category/services"
import {
  useCatalogOptionsStore,
  useCategoriesListStore,
} from "@/features/catalog/provider"
import { CatalogSearchControl } from "@/features/catalog/ui"
import { CategoriesList } from "@/pages/catalog-categories/ui/categories-list"
import { routes } from "@/shared/config/routes"
import { useUpdateEffect } from "@/shared/lib/hooks"
import { ContentSection, ContentSectionContent, EmptyState } from "@/shared/ui"
import { PageHeroRoutes } from "@/widgets/page-hero-routes/ui"
import * as React from "react"
import { useCallback } from "react"

const Page = () => {
  const categories = useCategoriesListStore((state) => state.categories)
  const setCategories = useCategoriesListStore((state) => state.setCategories)
  const setLoading = useCategoriesListStore((state) => state.setLoading)
  const setError = useCategoriesListStore((state) => state.setError)

  const searchQuery = useCatalogOptionsStore((state) => state.searchQuery)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetchCatalogCategoriesList(searchQuery)
      setCategories(response.data)
    } catch (e) {
      setError(e.message || "Произошла ошибка при загрузке категорий")
    } finally {
      setLoading(false)
    }
  }, [setCategories, setLoading, setError, searchQuery])

  useUpdateEffect(() => {
    fetchCategories()
  }, [fetchCategories])

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
