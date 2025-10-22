import { SeoComponent } from "@/entities/_components"
import { StrapiOptional } from "@/shared/model/strapi"
import { Metadata } from "next"

export const generateGlobalMetadata = <
  T extends StrapiOptional<{ seo?: StrapiOptional<Partial<SeoComponent>> }>,
>(
  data: T,
  options: {
    defaultTitle?: string
  } = { defaultTitle: "Страница не найдена" }
): Partial<Metadata> => {
  if (!data || !data.seo) {
    return {
      title: options.defaultTitle,
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

  const socialImageSource = openGraph?.ogImage || metaImage
  return {
    title: metaTitle,
    description: metaDescription,
    icons: {
      icon: "/api/favicon",
    },
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
