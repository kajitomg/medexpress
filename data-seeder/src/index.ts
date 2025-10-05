import cors from "cors"
import express from "express"
import { processXmlStream } from "./lib/roszdravnadzor.xml"

const app = express()
const port = 3001

app.use(cors())

app.get("/fill", async (req, res) => {
  try {
    const providedUrl = req.query.url.toString()
    if (!providedUrl) res.status(404).json({ error: "Required query parameter 'url' not found" })
    processXmlStream(providedUrl)
    res.status(200).json({})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Proxy error" })
  }
})

app.listen(port, () => {
  console.log(`Server has been started on PORT ${port}`)
})

