import { StrapiBase } from "@/shared/model/strapi/index"

export type MediaFormats<F extends string = string> =
  | "thumbnail"
  | "small"
  | "medium"
  | "large"
  | F

export type MediaFormat = {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes?: number
}

export interface StrapiMediaAttributes<F extends string = string>
  extends Omit<StrapiBase, "publishedAt" | "locale"> {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: Record<MediaFormats<F>, MediaFormat> | null
  hash: string
  ext: string
  mime: MediaMimeType
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: Record<string, unknown> | null
}

export type StrapiMedia<F extends string = string> = StrapiMediaAttributes<F>

export type ImageMimeType =
  | "image/jpeg"
  | "image/jpg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff"

export type VideoMimeType =
  | "video/mp4"
  | "video/mpeg"
  | "video/quicktime"
  | "video/webm"
  | "video/x-msvideo"

export type AudioMimeType =
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | "audio/webm"

export type DocumentMimeType =
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

export type MediaMimeType =
  | ImageMimeType
  | VideoMimeType
  | AudioMimeType
  | DocumentMimeType
  | string

export type ImageMedia<F extends string = string> = StrapiMediaAttributes<F> & {
  mime: ImageMimeType
  width: number
  height: number
  formats: Partial<Record<MediaFormats<F>, MediaFormat>>
}

export type VideoMedia = StrapiMediaAttributes & {
  mime: VideoMimeType
}

export type AudioMedia = StrapiMediaAttributes & {
  mime: AudioMimeType
}

export type DocumentMedia = StrapiMediaAttributes & {
  mime: DocumentMimeType
}
