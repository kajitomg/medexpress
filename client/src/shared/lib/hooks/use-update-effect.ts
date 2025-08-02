import { DependencyList, EffectCallback, useEffect, useRef } from "react"

const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    effect()
  }, deps)
}

export { useUpdateEffect }
