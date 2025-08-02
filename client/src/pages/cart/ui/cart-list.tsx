import { ProductBase } from "@/entities/product/model"
import { useCartStore } from "@/features/cart/provider"
import { CartItem } from "@/pages/cart/ui/cart-item"
import { List } from "@/shared/ui"

interface CartListProps {
  products: CartItem<ProductBase>[]
}

const CartList = ({ products }: CartListProps) => {
  const { incrementItemInCart, decrementItemInCart, deleteItemFromCart } =
    useCartStore()

  const renders = {
    cartProduct: (item: (typeof products)[0]) => (
      <CartItem
        key={item.item.id}
        product={item}
        incrementItemInCart={() => incrementItemInCart(item.item.id)}
        decrementItemInCart={() => decrementItemInCart(item.item.id)}
        deleteItemFromCart={() => deleteItemFromCart(item.item.id)}
      />
    ),
  }

  return (
    <List
      as="ul"
      items={products}
      renderItem={renders.cartProduct}
      className="mt-12"
    />
  )
}

export { CartList }
