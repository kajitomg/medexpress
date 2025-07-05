import { cn } from "@/shared/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/ui/navigation-menu"
import { CatalogMenu } from "@/widgets/catalog-menu"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import * as React from "react"

const Header = ({ className, ...props }: React.ComponentProps<"header">) => {
  /*const [catalogTrigger, setCatalogTrigger] = useState<boolean>(false)
  const onRefChange = useCallbackRef((node) => {
    if (node !== null) {
      setCatalogTrigger(node.ariaExpanded)
    }
  })

  useEffect(() => {
    const handleWindowWheel = (event: WheelEvent) => {
      if (catalogTrigger) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener("wheel", handleWindowWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWindowWheel)
    }
  }, [catalogTrigger])
*/
  return (
    <header
      className={cn(className, "w-full h-20 py-4 backdrop-blur-3xl")}
      {...props}
    >
      <div className="h-full grid grid-cols-6 content-center justify-items-center-safe items-center">
        <span className="col-start-1 justify-self-center">
          <Link href="/" className="font-black">
            Medexpress
          </Link>
        </span>
        <NavigationMenu className="col-start-2 col-span-4 justify-self-start">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
              <NavigationMenuContent>
                <CatalogMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/about">О нас</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/contacts">Контакты</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="col-start-6 col-span-2 justify-self-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/cart">
                  <ShoppingCart />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}

export default Header
