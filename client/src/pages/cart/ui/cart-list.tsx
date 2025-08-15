import { ProductBase } from "@/entities/product/model"
import { useCartStore } from "@/features/cart/provider"
import { CartItem } from "@/pages/cart/ui/cart-item"
import { List } from "@/shared/ui"
import { ScrollArea } from "@/shared/ui/scroll-area"

interface CartListProps {
  products: CartItem<ProductBase>[]
}

const CartList = ({ products }: CartListProps) => {
  const { incrementItemInCart, decrementItemInCart, deleteItemFromCart } =
    useCartStore((state) => state)

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
    <ScrollArea className="h-full pr-4">
      <List
        as="ul"
        items={products}
        renderItem={renders.cartProduct}
        className="gap-2 flex flex-col"
      />
    </ScrollArea>
  )
}

export { CartList }
