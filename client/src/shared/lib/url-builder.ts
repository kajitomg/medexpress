import "dotenv/config"

const urlBuilder = (url: string) => {
  return process.env.NEXT_PUBLIC_API_URL + url
}

export { urlBuilder }
