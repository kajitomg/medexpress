import { useGlobalStore } from "@/features/global/provider"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import Image from "next/image"
import * as React from "react"
import { useEffect } from "react"

interface ImagesDialogProps {
  items?: Media[]
  selectedIndex: number
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const ImagesDialog = ({
  items,
  selectedIndex,
  isOpen,
  onOpenChange,
}: ImagesDialogProps) => {
  const defaultMedia = useGlobalStore(
    (state) => state.data?.defaultProductImage
  )
  const [mainApi, setMainApi] = React.useState<CarouselApi>()

  useEffect(() => {
    mainApi?.scrollTo(selectedIndex)
  }, [mainApi, selectedIndex])
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle className="sr-only">Карусель фотографий</DialogTitle>
      </DialogHeader>
      <DialogContent
        aria-describedby="Модальное окно карусель фотографий"
        className="min-w-[min(95vw,1280px)] gap-0 p-0 flex-col rounded-md overflow-hidden"
      >
        <Carousel setApi={setMainApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {items?.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden bg-transparent border-none rounded-md p-0">
                  <CardContent className="p-0">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <Image
                        src={imageUrlBuilder(image.url || defaultMedia?.url)}
                        alt={image.name}
                        fill
                        className="object-contain"
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
            className="bg-white/20 absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          />
          <CarouselNext
            variant="secondary"
            className="bg-white/20 absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          />
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export { ImagesDialog }
