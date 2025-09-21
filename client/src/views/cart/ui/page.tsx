import { ProductsListProvider } from "@/features/catalog/provider"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { Cart } from "@/views/cart/ui/cart"
import { WizardCart } from "@/views/cart/ui/wizard-cart"

const Page = async () => {
  return (
    <>
      <ProductsListProvider>
        <ContentSection className="py-4 sm:py-4 md:py-4 lg:py-4 xl:py-4">
          <ContentSectionContent className="flex max-w-8xl w-full justify-center items-center">
            <Cart className="hidden lg:flex" />
            <WizardCart className="flex lg:hidden" />
          </ContentSectionContent>
        </ContentSection>
      </ProductsListProvider>
    </>
  )
}

export { Page }
