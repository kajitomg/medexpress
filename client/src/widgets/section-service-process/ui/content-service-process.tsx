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
          <div className="grid grid-cols-1 justify-items-center" key={item.id}>
            <div className="relative rounded-full w-16 h-16 bg-background shadow-sm shadow-black">
              <item.icon className="absolute top-1/2 left-1/2 -translate-1/2 w-6 h-6" />
            </div>
            <div className="text-center mt-2 md:mt-4 xl:mt-6">
              <h6 className="text-base md:text-xl font-bold">{item.title}</h6>
              <span className="inline-block text-gray-700 font-light text-sm md:text-base mt-2 md:mt-4 xl:mt-6">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ContentServiceProcess }
