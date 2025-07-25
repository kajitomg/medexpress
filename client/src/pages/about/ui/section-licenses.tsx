import {
  ContentSection,
  ContentSectionContent,
  ContentSectionHeader,
  Title,
} from "@/shared/ui"
import Image from "next/image"
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
        <Title asChild className="hover-scale cursor-default">
          <h4>
            <strong>Лицензии</strong>
          </h4>
        </Title>
      </ContentSectionHeader>
      <ContentSectionContent className="grid grid-cols-5 gap-8">
        {DATA.map((item) => (
          <Image
            key={item.id}
            alt={item.title}
            src={item.src}
            width="200"
            height="300"
          ></Image>
        ))}
      </ContentSectionContent>
    </ContentSection>
  )
}

export { SectionLicenses }
