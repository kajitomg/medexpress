"use client"

import { StateStorage } from "zustand/middleware"

const getUrlSearch = () => {
  return window.location.search.slice(1)
}

const searchParamsStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(getUrlSearch())
    const storedValue = searchParams.get(key)
    return storedValue || ""
  },
  setItem: (key, newValue): void => {
    const storedValue = new URLSearchParams(JSON.parse(newValue).state)
    if (!storedValue.size) window.history.replaceState(null, "", null)
    else {
      const searchParams = new URLSearchParams(getUrlSearch())
      searchParams.set(key, newValue)
      window.history.replaceState(null, "", `?${searchParams}`)
    }
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch())
    searchParams.delete(key)
    window.location.search = searchParams.toString()
  },
}

export { searchParamsStorage }
