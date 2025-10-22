import "dotenv/config"
import axios from "axios"
import cors from "cors"
import express from "express"
import { deleteAllData, processXmlStream } from "./lib/roszdravnadzor.xml.claude"

const API_TOKEN = process.env.API_TOKEN
const API_URL = process.env.API_URL


const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
}

const api = axios.create({
  baseURL: API_URL,
  headers,
})

const app = express()
const port = 3001

app.use(cors())

app.get("/fill", async (req, res) => {
  try {
    const providedUrl = req.query.url.toString()
    if (!providedUrl) res.status(404).json({ error: "Required query parameter 'url' not found" })
    await processXmlStream(providedUrl, api)
    res.status(200).json({})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Proxy error" })
  }
})

app.get("/delete", async (req, res) => {
  try {
    await deleteAllData(api, { deleteSections: true, deleteTypes: true, confirm: true })
    res.status(200).json({})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Proxy error" })
  }
})

app.listen(port, () => {
  console.log(`Server has been started on PORT ${port}`)
})

