"use client"

import { StateStorage } from "zustand/middleware"

const getUrlSearch = () => {
  return window.location.search.slice(1)
}

const searchParamsStorage: StateStorage = {
  getItem: (key) => {
    const searchParams = new URLSearchParams(getUrlSearch())
    return searchParams.get(key)
  },
  setItem: (key, newValue) => {
    const storedValue = new URLSearchParams(JSON.parse(newValue).state)
    if (!storedValue.size) window.history.replaceState(null, "", null)
    else {
      const searchParams = new URLSearchParams(getUrlSearch())
      searchParams.set(key, newValue)
      window.history.replaceState(null, "", `?${searchParams}`)
    }
  },
  removeItem: (key) => {
    const searchParams = new URLSearchParams(getUrlSearch())
    searchParams.delete(key)
    console.log("removeItem")
    window.location.search = searchParams.toString()
  },
}

export { searchParamsStorage }
