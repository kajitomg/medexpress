import { cn } from "@/shared/lib"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl lg:text-5xl font-bold tracking-tight text-balance",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 text-muted-foreground",
      lead: "text-lg text-muted-foreground",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      link: "text-primary underline underline-offset-4 hover:no-underline",
    },
  },
  defaultVariants: { variant: "p" },
})

const Typography = ({
  className,
  variant,
  asChild,
  ...props
}: ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : "p"

  return (
    <Comp
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
