import { ProductBase } from "@/entities/product/model"
import { AddToCartButton } from "@/features/cart/ui/add-to-cart-button"
import { Price } from "@/features/catalog/ui/price"
import { routes } from "@/shared/config/routes"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { DocumentServices } from "@/shared/model"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ModalContactFormProduct } from "@/widgets/modal-contact-form-product/ui"
import Image from "next/image"
import { useRouter } from "next/navigation"
import * as React from "react"

interface CatalogProductItemProps {
  product: ProductBase & DocumentServices
}

const CatalogProductItem = ({ product }: CatalogProductItemProps) => {
  const router = useRouter()
  return (
    <Card
      onClick={() => router.push(routes.PRODUCT(product?.slug).path)}
      className="@container pt-0 overflow-hidden shadow-black/20 hover:shadow-xl duration-200 from-muted/50 to-muted bg-linear-to-b outline-hidden focus:shadow-md"
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
        <ModalContactFormProduct size="sm" product={product} />
      </CardFooter>
    </Card>
  )
}

/*
   <Button
            variant="secondary"
            size="sm"
            className="group relative cursor-pointer hover:shadow-md active:shadow-md transition-all duration-300 overflow-hidden"
          >
            <span className="flex items-center group-hover:space-x-2">
              <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100 group-active:max-w-[200px] group-active:opacity-100">
                К оформлению
              </span>
              <Phone className="size-4 flex-shrink-0" />
            </span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="group relative cursor-pointer hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <span className="flex items-center gap-2">
              <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
                К оформлению
              </span>
              <Phone className="w-4 h-4 flex-shrink-0" />
            </span>
          </Button>

*/

export { CatalogProductItem }
