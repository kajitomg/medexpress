import { approximatelyEqual } from "@/shared/lib/approximately-equal"
import { useCallback, useEffect, useState } from "react"

export const useScrollDirection = () => {
  const [y, setY] = useState(0)
  const [loadPrev, setLoadPrev] = useState<number>(0)
  const [direction, setDirection] = useState<"init" | "down" | "up">("init")

  const handleEvent = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window
      const load = +(
        (window.scrollY / (document.body.offsetHeight - window.innerHeight)) *
        100
      ).toFixed(5)
      const epsilon =
        0.7 - (document.body.offsetHeight - window.innerHeight) / 10000
      if (load >= 100 || load <= 0) return
      if (approximatelyEqual(loadPrev, load, epsilon)) return
      if (y > window.scrollY && direction !== "up") {
        setDirection("up")
      } else if (y < window.scrollY && direction !== "down") {
        setDirection("down")
      }
      setLoadPrev(load)
      setY(window.scrollY)
    },
    [loadPrev, y, direction]
  )

  useEffect(() => {
    setY(window.scrollY)
    window.addEventListener("scroll", handleEvent)

    return () => {
      window.removeEventListener("scroll", handleEvent)
    }
  }, [handleEvent])

  return direction
}
