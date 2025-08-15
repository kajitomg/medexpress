import { Typography } from "@/shared/ui"
import { LucideProps } from "lucide-react"
import * as React from "react"
import { ComponentProps } from "react"

interface ContentStandOutProps {
  items: {
    id: number
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
    title: string
    description: string
  }[]
}

const ContentStandOut = ({
  items,
  className,
}: ComponentProps<"div"> & ContentStandOutProps) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 ms:gap-2 md:gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid items-center gap-2 lg:gap-4 content-start justify-start"
          >
            <item.icon className="size-5 md:size-6" />
            <Typography asChild variant="h4" className="col-start-2">
              <h4>{item.title}</h4>
            </Typography>
            <Typography variant="muted" className="col-start-2">
              {item.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContentStandOut }
