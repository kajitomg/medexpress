import { Price as PriceT } from "@/entities/price/model"
import { Typography } from "@/shared/ui"
import * as React from "react"

interface PriceProps {
  price?: PriceT | null
}

const Price = ({ price }: PriceProps) => {
  if (!price || price.priceStatus === "NOT SPECIFIED") {
    return (
      <Typography variant="lead" target="card">
        <strong className="text-(--color-brand)">Цена не указана</strong>
      </Typography>
    )
  }
  if (price.priceStatus === "ON REQUEST") {
    return (
      <Typography variant="lead" target="card">
        <strong className="text-(--color-brand)">Цена по запросу</strong>
      </Typography>
    )
  }
  const formater = new Intl.NumberFormat(price?.currency?.localeType, {
    style: "currency",
    currency: price?.currency?.currency,
  })
  const formattedValue = formater.format(price?.price)

  switch (price?.direction) {
    case "FROM": {
      return (
        <div className="flex flex-col">
          <Typography variant="small" className="leading-none">
            Цена от:
          </Typography>
          <Typography variant="lead" target="card">
            <strong className="text-(--color-brand)">{formattedValue}</strong>
          </Typography>
        </div>
      )
    }
    case "CURRENT": {
      return (
        <div className="flex flex-col">
          <Typography variant="small" className="leading-none">
            Цена:
          </Typography>
          <Typography variant="lead" target="card" className="leading-none">
            <strong className="text-(--color-brand)">{formattedValue}</strong>
          </Typography>
        </div>
      )
    }
    default:
      return null
  }
}

export { Price }
