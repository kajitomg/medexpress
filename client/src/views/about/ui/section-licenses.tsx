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

const DATA = [
  { id: 1, title: "Документ 1", src: "/doc1.jpg" },
  { id: 2, title: "Документ 2", src: "/doc2.jpg" },
  { id: 3, title: "Документ 3", src: "/doc3.jpg" },
  { id: 4, title: "Документ 4", src: "/doc4.jpg" },
  { id: 5, title: "Документ 5", src: "/doc5.jpg" },
]

const SectionLicenses = () => {
  return (
    <ContentSection>
      <ContentSectionHeader className="hover:scale-102 transition-transform duration-200 cursor-default">
        <Typography asChild variant="h2">
          <h2 className="hover-scale text-center">
            <strong>Лицензии</strong>
          </h2>
        </Typography>
      </ContentSectionHeader>
      <ContentSectionContent className="w-full flex items-center">
        <ScrollArea className="flex-1 min-w-0 rounded-sm pb-3">
          <div className="flex gap-2 md:gap-4">
            {DATA.map((item) => (
              <Link
                key={item.id}
                href={item.src}
                className="group hover:before:bg-black/30 relative before:z-10 before:absolute before:size-full before:duration-200 border-3 rounded-sm overflow-hidden flex-none basis-1/4"
              >
                <AspectRatio ratio={210 / 297}>
                  <Image
                    alt={item.title}
                    src={item.src}
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
