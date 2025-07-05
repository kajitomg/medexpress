export type MediaFormats<F extends string = string> =
  | "small"
  | "medium"
  | "thumbnail"
  | F

export interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
}

export interface Media<F extends string = string> {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: Record<MediaFormats<F>, MediaFormat> | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}
