import axios from "axios"

export const api = axios.create({
  baseURL: process.env.API_PATH,
})

api.defaults.headers.common["Authorization"] = `Bearer ${process.env.API_TOKEN}`
