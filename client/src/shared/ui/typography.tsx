import { cn } from "@/shared/lib"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import * as React from "react"
import { ComponentProps } from "react"

const typographyVariants = cva("", {
  variants: {
    variant: {
      display:
        "text-4xl sm:text-5xl md:text-6xl font-black leading-[1.0] tracking-tight text-balance text-foreground",
      display_small:
        "text-3xl sm:text-4xl md:text-5xl font-black leading-[1.0] tracking-tight text-balance text-foreground",
      h1: "scroll-m-20 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground",
      h2: "scroll-m-20 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight first:mt-0 text-foreground",
      h3: "scroll-m-20 text-2xl md:text-3xl font-bold tracking-tight text-foreground",
      h4: "scroll-m-20 text-base lg:text-lg font-bold tracking-tight text-foreground",
      p: "leading-7 text-muted-foreground",
      lead: "text-lg text-muted-foreground",
      small: "text-sm font-medium leading-none",
      muted: "text-sm lg:text-base text-muted-foreground",
      link: "text-blue-400 underline underline-offset-4 hover:no-underline",
    },
    target: { card: true, default: true },
  },
  defaultVariants: { variant: "p", target: "default" },
  compoundVariants: [
    {
      variant: "h2",
      target: "card",
      className: "text-lg sm:text-xl md:text-2xl font-bold",
    },
    {
      variant: "h3",
      target: "card",
      className: "md:text-lg font-bold",
    },
    {
      variant: "h4",
      target: "card",
      className: "text-sm lg:text-base font-bold",
    },
    {
      variant: "p",
      target: "card",
      className: "text-sm leading-5",
    },
    {
      variant: "muted",
      target: "card",
      className: "text-sm",
    },
    {
      variant: "small",
      target: "card",
      className: "text-xs font-light",
    },
  ],
})

const Typography = ({
  className,
  variant,
  target,
  asChild,
  ...props
}: ComponentProps<"p"> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : "p"

  return (
    <Comp
      className={cn(typographyVariants({ variant, target, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
