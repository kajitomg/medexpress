import { useCallback, useEffect, useState } from "react"

export const useDeferredScrollDirection = (deferred: number = 200) => {
  const [y, setY] = useState(0)
  const [anchorY, setAnchorY] = useState<null | number>(null)
  const [direction, setDirection] = useState<"init" | "down" | "up">("init")
  const [preliminarilyDirection, setPreliminarilyDirection] = useState<
    "init" | "down" | "up"
  >("init")

  const handleEvent = useCallback(
    (e: Event) => {
      const window = e.currentTarget as Window
      if (y > window.scrollY && preliminarilyDirection !== "up") {
        setPreliminarilyDirection("up")
        setAnchorY(window.scrollY)
      } else if (y < window.scrollY && preliminarilyDirection !== "down") {
        setPreliminarilyDirection("down")
        setAnchorY(window.scrollY)
      }
      if (anchorY && Math.abs(anchorY - window.scrollY) >= deferred) {
        setDirection(preliminarilyDirection)
        setAnchorY(null)
      }

      setY(window.scrollY)
    },
    [y, anchorY, preliminarilyDirection, deferred]
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
