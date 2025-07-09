import { DocumentId } from "@/shared/model"

export const Routes = {
  MAIN: "/",
  CATALOG: (category_id: DocumentId) => `/catalog/${category_id}`,
  ABOUT: "/about",
  ARTICLES: "/articles",
  CART: "/cart",
  CLIENTS: "/clients",
  CONSTRUCTOR: "/constructor",
  CONTACTS: "/contacts",
  DETAILS: "/details",
  FEEDBACK: "/feedback",
  SITEMAP: "/sitemap",
}
