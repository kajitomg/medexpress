import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Bird } from "lucide-react"
import React, { ComponentProps } from "react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

const DefaultIcon = () => <Bird className="size-24 text-muted-foreground" />

const EmptyState = ({
  title,
  description,
  icon = <DefaultIcon />,
  action,
}: ComponentProps<"div"> & EmptyStateProps) => {
  return (
    <Card className="w-full border-2 border-dashed bg-muted/40">
      <CardContent className="flex flex-col items-center justify-center p-2 md:p-4 lg:p-6 text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
        {action && (
          <Button onClick={action.onClick} className="mt-6">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export { EmptyState }
