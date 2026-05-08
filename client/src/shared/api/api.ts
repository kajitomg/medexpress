"use server"

const API_URL = process.env.API_URL
const API_TOKEN = process.env.API_TOKEN

if (!API_URL) {
  throw new Error("Пропущена переменная окружающей среды API_URL")
}

export async function api(
  endpoint: string,
  options: RequestInit & {
    params?: string | URLSearchParams
  } = {}
): Promise<Response> {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  }

  const headers = new Headers({
    ...defaultHeaders,
    ...options.headers,
  })

  const path = !options.params ? endpoint : endpoint + `?${options.params}`

  const url = new URL(path, API_URL)

  return await fetch(url, {
    ...options,
    headers,
  })
}
