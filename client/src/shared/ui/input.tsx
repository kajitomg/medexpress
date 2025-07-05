import { cn } from "@/shared/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const inputVariants = cva(
  cn(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex w-full border min-w-0 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "file:text-foreground rounded-md placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input bg-transparent text-base file:bg-transparent file:text-sm file:font-medium md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        ),
        brand:
          "focus-visible:ring-(--color-brand)/50 text-gray-600 rounded-4xl placeholder:text-gray-400 dark:bg-white dark:focus-visible:ring-gray-500  focus-visible:ring-1",
        brandBackgrounded:
          "focus-visible:ring-(--color-brand)/50 text-gray-600 rounded-4xl placeholder:text-gray-400 bg-white focus-visible:ring-gray-500 focus-visible:ring-1",
      },
      mysize: {
        default:
          "h-9 px-3 py-1 file:border-0 file:text-sm file:font-medium md:text-sm",

        lg: "h-14 px-6 py-1 file:border-0 text-lg md:text-lg placeholder:text-lg file:text-sm file:font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      mysize: "default",
    },
  }
)

function Input({
  className,
  variant,
  mysize,
  type,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, mysize, className }))}
      {...props}
    />
  )
}

export { Input }
