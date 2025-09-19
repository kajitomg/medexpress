import { useCallback, useEffect, useState } from "react"

export const useScrollDirection = () => {
  const [y, setY] = useState(0)
  const [direction, setDirection] = useState<"init" | "down" | "up">("init")

  const handleEvent = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window
      const fullness = Math.round(
        ((window.scrollY + window.innerHeight) / document.body.offsetHeight) *
          100
      )
      if (fullness >= 99) return
      if (y > window.scrollY) {
        setDirection("up")
      } else if (y < window.scrollY) {
        setDirection("down")
      }
      setY(window.scrollY)
    },
    [y]
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
