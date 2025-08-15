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
            className="grid items-center gap-4 ms:gap-2 md:gap-4 content-start justify-start"
          >
            <item.icon className="size-5 md:size-6" />
            <h5 className="font-bold text-base md:text-xl col-start-2">
              {item.title}
            </h5>
            <span className="text-gray-700 text-sm md:text-base font-light col-start-2">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContentStandOut }
