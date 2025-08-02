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
  PRODUCT = (productId: string | number = "", title = "Товар") => {
    return {
      path: `/product/${productId}`,
      title,
      parent: this.CATALOG,
    }
  }
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
  PRIVATEPOLICY = {
    path: "/private-policy",
    title: "Политика конфиденциальности",
    parent: this.MAIN,
  }
  COLLESCTIONS = (collectionId: string | number = "", title = "Подборки") => ({
    path: `/collections/${collectionId}`,
    title,
    parent: this.MAIN,
  })
}

export const routes = new Routes()
