import { SeoComponent, SeoTemplateComponent } from "@/entities/_components"
import { StrapiOptional } from "@/shared/model/strapi"
import { Metadata } from "next"

export const generatePageMetadata = <
  T extends StrapiOptional<{
    seo?: StrapiOptional<
      Partial<SeoComponent> &
        Pick<SeoComponent, "metaTitle" | "metaDescription">
    >
    seoTemplate?: StrapiOptional<Partial<SeoTemplateComponent>>
  }>,
>(
  data: T,
  options: {
    defaultTitle?: string
    defaultDescription?: string
  } = { defaultTitle: "Страница не найдена" }
): Partial<Metadata> => {
  if (!data || !data.seo) {
    return {
      title: options.defaultTitle,
      description: options.defaultDescription,
    }
  }
  const {
    metaTitle,
    metaDescription,
    metaImage,
    metaRobots,
    keywords,
    openGraph,
    canonicalURL,
  } = data.seo

  const metaTitleTemplate = data.seoTemplate?.metaTitleTemplate

  const socialImageSource = openGraph?.ogImage || metaImage
  return {
    title: metaTitleTemplate
      ? {
          default: metaTitle,
          template: metaTitleTemplate,
        }
      : metaTitle,
    description: metaDescription,
    robots: metaRobots,
    keywords: keywords,
    alternates: {
      canonical: canonicalURL,
    },
    openGraph: {
      title: openGraph?.ogTitle || metaTitle,
      description: openGraph?.ogDescription || metaDescription,
      type: (openGraph?.ogType as "website" | "article") || "website",
      url: openGraph?.ogUrl || undefined,
      images: socialImageSource
        ? [
            {
              url: new URL(
                process.env.NEXT_PUBLIC_API_URL + socialImageSource.url
              ),
              width: socialImageSource.width,
              height: socialImageSource.height,
              alt: socialImageSource.alternativeText || metaTitle,
            },
          ]
        : [],
    },
  }
}
