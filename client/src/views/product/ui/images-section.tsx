import { useGlobalStore } from "@/features/global/provider"
import { cn } from "@/shared/lib"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { Media } from "@/shared/model"
import { Card, CardContent } from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { ImagesDialog } from "@/views/product/ui/images-dialog"
import Image from "next/image"
import React from "react"

interface ImagesSectionProps {
  items?: Media[]
}

const ImagesSection = ({ items }: ImagesSectionProps) => {
  const defaultMedia = useGlobalStore(
    (state) => state.data?.defaultProductImage
  )
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [mainApi, setMainApi] = React.useState<CarouselApi>()
  const [thumbnailApi, setThumbnailApi] = React.useState<CarouselApi>()

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!mainApi) {
        return
      }
      mainApi.scrollTo(index)
    },
    [mainApi]
  )

  const onSelect = React.useCallback(() => {
    if (!mainApi || !thumbnailApi) {
      return
    }
    setSelectedIndex(mainApi.selectedScrollSnap())
    thumbnailApi.scrollTo(mainApi.selectedScrollSnap())
  }, [mainApi, thumbnailApi])

  React.useEffect(() => {
    if (!mainApi) {
      return
    }
    onSelect()
    mainApi.on("select", onSelect)

    return () => {
      mainApi.off("select", onSelect)
    }
  }, [mainApi, thumbnailApi, onSelect])
  if (!items || items.length === 0) {
    return (
      <Card>
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-muted-foreground">Нет изображений</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ImagesDialog
        selectedIndex={selectedIndex}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        items={items}
      />
      <Carousel
        setApi={setMainApi}
        opts={{ loop: true }}
        className="w-full group"
      >
        <CarouselContent>
          {items.map((image, index) => (
            <CarouselItem key={index}>
              <Card
                className="overflow-hidden bg-transparent border-none rounded-md p-0 cursor-pointer"
                onClick={() => {
                  setIsOpen(true)
                }}
              >
                <CardContent className="p-0">
                  <AspectRatio ratio={16 / 10} className="bg-muted">
                    <Image
                      src={imageUrlBuilder(image.url || defaultMedia?.url)}
                      alt={image.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 35vw, 80vw"
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant="secondary"
          className="hidden group-hover:flex bg-white/20 absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
        />
        <CarouselNext
          variant="secondary"
          className="hidden group-hover:flex bg-white/20 absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
        />
      </Carousel>

      <Carousel
        setApi={setThumbnailApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
        className="w-full mt-4 @container flex items-center gap-2"
      >
        <CarouselPrevious
          variant="brand"
          className="static flex-none translate-0 cursor-pointer"
        />
        <div className="flex-auto basis-full">
          <CarouselContent className="-ml-2">
            {items.map((image, index) => (
              <CarouselItem
                key={index}
                className="pl-2 basis-1/4 @sm:basis-1/5 @md:basis-1/6"
              >
                <div
                  onClick={() => onThumbClick(index)}
                  className="p-1 cursor-pointer"
                  aria-label={`Перейти к изображению ${index + 1}`}
                >
                  <div
                    className={cn(
                      "relative aspect-square transition-opacity overflow-hidden rounded-md",
                      index === selectedIndex
                        ? "ring-1 ring-(--color-brand) ring-offset-1"
                        : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={imageUrlBuilder(image.url || defaultMedia?.url)}
                      alt={image.name}
                      fill
                      className="object-cover"
                      sizes="10vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <CarouselNext
          variant="brand"
          className="static flex-none translate-0 cursor-pointer"
        />
      </Carousel>
    </div>
  )
}
export { ImagesSection }
