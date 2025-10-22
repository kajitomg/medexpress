import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { Price } from "@/features/product/ui/price"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ContactFormModalWithProduct } from "@/widgets/contact-form/ui"
import Image from "next/image"
import { useRouter } from "next/navigation"
import * as React from "react"

interface ProductItemProps {
  product: ProductBase
}

const ProductItemCard = ({ product }: ProductItemProps) => {
  const router = useRouter()
  return (
    <Card
      onClick={() => router.push(routes.PRODUCT(product?.slug).path)}
      className="@container pt-0 overflow-hidden shadow-black/20 hover:shadow-xl duration-200 from-muted/50 to-muted bg-linear-to-b outline-hidden focus:shadow-md cursor-pointer"
    >
      <CardHeader className="px-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={imageUrlBuilder(product.images?.[0]?.url)}
            alt={product.name}
            width="300"
            height="300"
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex-auto flex flex-col gap-4">
        <Typography asChild variant="h4" target="card">
          <h4>{product.name}</h4>
        </Typography>
        <Typography variant="small" target="card">
          Артикул: {product.type?.code}
        </Typography>
        <Typography className="line-clamp-4" target="card">
          {product.description}
        </Typography>
        <Price price={product.price?.[0]} />
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <AddToCartButton product={product} />{" "}
        <ContactFormModalWithProduct size="sm" product={product} />
      </CardFooter>
    </Card>
  )
}

export { ProductItemCard }
