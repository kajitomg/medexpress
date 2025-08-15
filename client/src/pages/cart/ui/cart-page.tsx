import { WizardCart } from "@/pages/cart/ui/wizard-cart"
import { ContentSection, ContentSectionContent } from "@/shared/ui"
import { Cart } from "./cart"

const CartPage = () => {
  return (
    <>
      <ContentSection className="py-4 sm:py-4 md:py-4 lg:py-4 xl:py-4">
        <ContentSectionContent className="flex max-w-8xl w-full justify-center items-center">
          <Cart className="hidden lg:flex" />
          <WizardCart className="flex lg:hidden" />
        </ContentSectionContent>
      </ContentSection>
    </>
  )
}

export { CartPage }
