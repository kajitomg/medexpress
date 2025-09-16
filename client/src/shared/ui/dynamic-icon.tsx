"use client"

import { cn } from "@/shared/lib"
import { Skeleton } from "@/shared/ui/skeleton"
import parse from "html-react-parser"
import { FileWarning } from "lucide-react"
import React, { HTMLAttributes, useEffect, useState } from "react"

interface Props extends HTMLAttributes<SVGElement> {
  url?: string
}

export default function DynamicIcon({ url, ...props }: Props) {
  const [svg, setSvg] = useState<string | null>(null)
  const [status, setStatus] = useState<
    "idle" | "success" | "loading" | "error"
  >("idle")

  const fetchSvg = async (url: string) => {
    try {
      setStatus("loading")
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`)
      const svgText = await res.text()
      setSvg(svgText)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    if (url && status !== "loading") {
      fetchSvg(url)
    }
  }, [url])

  if (status === "loading" || (status === "idle" && url))
    return <Skeleton className={cn("bg-muted-foreground", props.className)} />

  if (status === "error") return <FileWarning className={cn(props.className)} />

  const parsedElement = svg && parse(svg)
  if (parsedElement && React.isValidElement(parsedElement)) {
    return React.cloneElement(parsedElement, props)
  }
  return null
}
