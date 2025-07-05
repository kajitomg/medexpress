"use client"

import { ProductBase } from "@/entities/product/model/product"
import { CartItem } from "@/features/cart/model"
import { useCartStore } from "@/features/cart/store/cart-store"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Separator } from "@radix-ui/react-separator"
import { Minus, Plus, X } from "lucide-react"
import { LeftArrow } from "next/dist/client/components/react-dev-overlay/ui/icons/left-arrow"
import Image from "next/image"
import * as React from "react"

const Cart = () => {
  const { products } = useCartStore((state) => state)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto flex justify-center items-center">
        <div className="flex bg-(--color-brand)/20 p-12 rounded-[50px] max-w-350 h-160 mx-2 justify-center overflow-hidden gap-4 w-full">
          <div id="cart" className="flex-auto">
            <div className="h-15 flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer"
              >
                <LeftArrow className="size-6" />
              </Button>
              <h3 className="font-bold text-3xl">Корзина</h3>
            </div>
            <ul className="mt-12">
              {products.map((product) => (
                <Item key={product.item.id} product={product} />
              ))}
            </ul>
          </div>
          <Separator
            orientation="horizontal"
            className="w-[1px] bg-(--color-brand)/40"
          />
          <div id="form" className="w-100 flex flex-col h-full">
            <div className="h-15">
              <h4 className="font-bold text-lg">Заказ:</h4>
              <h6 className="font-light text-sm">
                Оставьте заявку, чтобы связаться с нами
              </h6>
            </div>
            <div className="mt-4 h-full flex flex-col justify-center gap-4">
              <Input type="phonenumber" placeholder="Введите номер телефона" />
              <Input type="email" placeholder="Введите email" />
              <Textarea
                placeholder="Напишите комментарий"
                className="text-sm placeholder:text-sm"
              />
              <div className="flex items-center">
                <Input type="checkbox" className="w-5 h-5 m-2" />
                <span className="text-xs font-light">
                  Согласие на обработку персональных данных
                </span>
              </div>
              <Button
                variant="ghost"
                className="cursor-pointer rounded-4xl text-gray-600  "
              >
                Оставить заявку
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const Item = (props: { product: CartItem<ProductBase> }) => {
  const { deleteItemFromCart, incrementItemInCart, decrementItemInCart } =
    useCartStore()

  return (
    <li className="cursor-pointer flex gap-4 items-start p-4 rounded-xl hover:bg-(--color-brand)/10">
      <div className="max-w-16">
        <Image
          src="/oborud.png"
          alt="alt"
          width="800"
          height="800"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-auto">
        <div className="text-xs font-light">
          <span className="hover:underline cursor-pointer">
            {props.product.item.code + "\n"}
          </span>
          <span>{"\n"}</span>
          <span className="hover:underline cursor-pointer">
            {props.product.item.categories?.[0]?.title}
          </span>
          <span>{"\n>\n"}</span>
          <span className="hover:underline cursor-pointer">
            {props.product.item.categories?.[1]?.title}
          </span>
          <span>{"\n"}</span>
        </div>
        <span className="text-sm font-bold">{props.product.item.title}</span>
      </div>
      <div className="max-w-50">
        <div className="text-xs font-light">
          Количество: {props.product.count} шт.
        </div>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer self-center w-7 h-7"
        onClick={() => incrementItemInCart(props.product.item.id)}
      >
        <Plus />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer self-center w-7 h-7"
        onClick={() => decrementItemInCart(props.product.item.id)}
      >
        <Minus />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="cursor-pointer self-center w-7 h-7"
        onClick={() => deleteItemFromCart(props.product.item.id)}
      >
        <X />
      </Button>
    </li>
  )
}

export default Cart
