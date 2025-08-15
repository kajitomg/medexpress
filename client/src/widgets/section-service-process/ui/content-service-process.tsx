import { Typography } from "@/shared/ui"
import { LucideProps } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

interface SectionServiceProcessContentProps {
  items: {
    id: number
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
    title: string
    description: string
  }[]
}

const ContentServiceProcess = ({
  items,
  className,
}: ComponentProps<"div"> & SectionServiceProcessContentProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
        {items.map((item) => (
          <div
            className="flex flex-col items-center gap-2 lg:gap-4"
            key={item.id}
          >
            <div className="relative rounded-full w-16 h-16 bg-background shadow-sm shadow-black">
              <item.icon className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
            </div>
            <Typography asChild variant="h4" className="col-start-2">
              <h4 className="text-center">{item.title}</h4>
            </Typography>
            <Typography
              variant="muted"
              className="col-start-2 col-start-2 text-center"
            >
              {item.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContentServiceProcess }
