import { GallerySectionComponent } from "@/entities/_components"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Typography,
} from "@/shared/ui"
import { AspectRatio } from "@/shared/ui/aspect-ratio"
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area"
import { ZoomIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

interface SectionLicenses {
  data?: GallerySectionComponent
}

const SectionLicenses = ({ data }: SectionLicenses) => {
  return (
    <ContentSection>
      <ContentSectionHeader className="hover:scale-102 transition-transform duration-200 cursor-default">
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>{data?.title}</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full flex items-center">
        <ScrollArea className="flex-1 min-w-0 rounded-sm pb-3">
          <div className="flex gap-2 md:gap-4">
            {data?.items?.map((item) => (
              <Link
                key={item.id}
                href={imageUrlBuilder(item.url)}
                className="group hover:before:bg-black/30 relative before:z-10 before:absolute before:size-full before:duration-200 border-3 rounded-sm overflow-hidden flex-none basis-1/4"
              >
                <AspectRatio ratio={210 / 297}>
                  <Image
                    alt={item.name}
                    src={imageUrlBuilder(item.url)}
                    width="210"
                    height="297"
                    className="w-full h-full object-cover duration-200 group-hover:scale-105"
                  />
                </AspectRatio>
                <ZoomIn className="z-10 size-10 text-accent absolute top-1/2 left-1/2 -translate-1/2 hidden group-hover:block" />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionLicenses }
