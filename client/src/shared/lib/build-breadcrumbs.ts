import { RouteEntry } from "../model/"

export function buildBreadcrumbs(route: RouteEntry): RouteEntry[] {
  const breadcrumbs: RouteEntry[] = []

  let current: RouteEntry | undefined = route

  while (current) {
    breadcrumbs.unshift(current) // добавляем в начало
    current = current.parent
  }

  return breadcrumbs
}
