export type CartItem = {
  slug: string
  count: number
}

export type CartData<T> = {
  item: T
  count: number
}
