import "dotenv/config"
import { urlBuilder } from "@/shared/lib/url-builder"

interface Options {
  defaultUrl: string
}

const defaultOptions: Options = {
  defaultUrl: "/default_image.webp",
}

const imageUrlBuilder = (url?: string, options: Options = defaultOptions) => {
  return url ? urlBuilder(url) : options.defaultUrl
}

export { imageUrlBuilder }
