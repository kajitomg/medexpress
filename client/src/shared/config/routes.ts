class Routes {
  MAIN = {
    path: "/",
    title: "Главная",
  }
  CATALOG = (categoryId: string | number = "", title = "Каталог") => ({
    path: `/catalog/${categoryId}`.replace(/\/$/, ""),
    title,
    parent: this.MAIN,
  })
  PRODUCT = (productId: string | number = "", title = "Товар") => {
    return {
      path: `/product/${productId}`.replace(/\/$/, ""),
      title,
      parent: this.CATALOG,
    }
  }
  ABOUT = {
    path: "/about",
    title: "О нас",
    parent: this.MAIN,
  }
  CART = {
    path: "/cart",
    title: "Корзина",
    parent: this.MAIN,
  }
  CONTACTS = {
    path: "/contacts",
    title: "Контакты",
    parent: this.MAIN,
  }
  SITEMAP = {
    path: "/sitemap",
    title: "Карта сайта",
    parent: this.MAIN,
  }
  PRIVATEPOLICY = {
    path: "/private-policy",
    title: "Политика конфиденциальности",
    parent: this.MAIN,
  }
  NOMENCLATURE = (
    nomenclatureId: string | number = "",
    title = "Классификация"
  ) => ({
    path: `/nomenclature/${nomenclatureId}`.replace(/\/$/, ""),
    title,
    parent: this.MAIN,
  })
  NOMENCLATURE_TYPE = (typeId: string | number = "", title = "Тип изделия") => {
    return {
      path: `/nomenclature-type/${typeId}`.replace(/\/$/, ""),
      title,
      parent: this.MAIN,
    }
  }
}

export const routes = new Routes()
