import { FileComponent } from "@/entities/_components/shared/file"
import { imageUrlBuilder } from "@/shared/lib/image-url-builder"
import { StrapiOptional } from "@/shared/model/strapi"
import { EmptyState, Typography } from "@/shared/ui"
import { File } from "lucide-react"
import Link from "next/link"
import * as React from "react"

interface DocumentsProps {
  documents?: StrapiOptional<FileComponent[]>
}

const Documents = ({ documents }: DocumentsProps) => {
  if (!documents?.length) {
    return <EmptyState title="Нет доступных документов" />
  }
  return (
    <div className="flex flex-wrap">
      {documents.map((item) => (
        <Link key={item.id} href={imageUrlBuilder(item.value?.url)}>
          <li className="flex items-center p-4 border-1 border-gray-200 hover:border-(--color-brand) gap-2 rounded-md">
            <File />
            <Typography className="text-center">
              {item.name}
              {item.value?.ext}
            </Typography>
          </li>
        </Link>
      ))}
    </div>
  )
}

export { Documents }
