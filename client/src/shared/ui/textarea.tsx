import { cn } from "@/shared/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const textareaVariants = cva(
  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content w-full border bg-transparent transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full border shadow-xs bg-transparent transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        brand:
          "focus-visible:ring-[#93A79E]/50 text-gray-600 placeholder:text-lg placeholder:text-gray-400",
        brandBackgrounded:
          "focus-visible:ring-[#93A79E]/50 text-gray-600 placeholder:text-lg placeholder:text-gray-400 bg-white focus-visible:ring-gray-500",
      },
      size: {
        default:
          "min-h-16 rounded-md px-3 py-2 text-base placeholder:text-base focus-visible:ring-[3px] md:text-sm",

        lg: "min-h-24 px-6 py-4 text-lg placeholder:text-lg focus-visible:ring-1 md:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea }
