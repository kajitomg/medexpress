const express = require("express")
const axios = require("axios")
const cors = require("cors") // Import the cors middleware

const app = express()
const port = 3001

// Enable CORS for all origins (INSECURE - use only for development)
app.use(cors())

app.post("/proxy", async (req, res) => {
  try {
    const response = await axios.post("https://roszdravnadzor.gov.ru/ajax/services/mi_reesetr", {}, {
      params: new URLSearchParams(req.query), // Pass through the query parameters
    })
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Proxy error" })
  }
})

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${ port }`)
})

