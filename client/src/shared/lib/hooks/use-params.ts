import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useParams = (
  name: string,
  initstate: any,
  changeCallback: any
) => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const [state, setState] = useState(params.get(name) || initstate)

  useEffect(() => {
    if (params.get(name) !== state) {
      changeCallback(state)
      if (state) params.set(name, state)
      else params.delete(name)
      if (params.toString())
        window.history.pushState(null, "", `?${params.toString()}`)
    }
  }, [state])

  return [state, setState]
}
