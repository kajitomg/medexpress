class Routes {
  MAIN = {
    path: "/",
    title: "Главная",
  }
  CATALOG = (categoryId: string | number = "", title = "Каталог") => ({
    path: `/catalog/${categoryId}`,
    title,
    parent: this.MAIN,
  })
  /*PRODUCT = (
    categoryId: string | number,
    productId: string | number,
    title = "Товар"
  ): RouteEntry => {
    const category = this.CATALOG(categoryId)
    return {
      path: `/catalog/${categoryId}/product/${productId}`,
      title,
      parent: category,
    }
  }*/
  ABOUT = {
    path: "/about",
    title: "О нас",
    parent: this.MAIN,
  }
  ARTICLES = {
    path: "/articles",
    title: "",
    parent: this.MAIN,
  }
  CART = {
    path: "/cart",
    title: "Корзина",
    parent: this.MAIN,
  }
  CLIENTS = {
    path: "/clients",
    title: "Клиенты",
    parent: this.MAIN,
  }
  CONSTRUCTOR = {
    path: "/constructor",
    title: "Конструктор",
    parent: this.MAIN,
  }
  CONTACTS = {
    path: "/contacts",
    title: "Контакты",
    parent: this.MAIN,
  }
  DETAILS = {
    path: "/details",
    title: "",
    parent: this.MAIN,
  }
  FEEDBACK = {
    path: "/feedback",
    title: "Отзывы",
    parent: this.MAIN,
  }
  SITEMAP = {
    path: "/sitemap",
    title: "Карта сайта",
    parent: this.MAIN,
  }
}

export const routes = new Routes()
