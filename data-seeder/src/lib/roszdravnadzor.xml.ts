import axios from "axios"
import "dotenv/config"
import qs from "qs"

import sax from "sax"
import slugify from "slugify"
import unzipper from "unzipper"
import { toSortCode } from "./to-sort-code"

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


export const processXmlStream = async (dataUrl) => {
  const saxStream = sax.createStream(true)
  let currentItem: {
    code?: string,
    name?: string,
    description?: string,
    sections?: { code?: string, name?: string, parent_code?: string }[]
  } | null = null
  let currentTag: string | null = null
  const errorsList = []
  
  const resSections = await api.get("api/device-sections")
  const resTypes = await api.get("api/device-types")
  
  const memSections = await resSections.data.data
  const memClassificators = await resTypes.data.data
  
  const result: (typeof currentItem)[] = []
  
  saxStream.on("opentag", (node) => {
    currentTag = node.name
    switch (currentTag) {
      case "classificator": {
        currentItem = {}
        return
      }
      case "sections": {
        currentItem.sections = []
        return
      }
      case "section": {
        currentItem.sections.push({})
        return
      }
      default:
        return
    }
  })
  
  saxStream.on("text", (text) => {
    const trimedText = text.trim()
    if (currentTag && currentItem && trimedText) {
      
      switch (currentTag) {
        case "code": {
          currentItem.code = trimedText
          return
        }
        case "name": {
          currentItem.name = trimedText
          return
        }
        case "description": {
          currentItem.description = trimedText
          return
        }
        case "section_number": {
          const currentSection = currentItem.sections[(currentItem.sections.length - 1) || 0]
          currentSection.code = trimedText
          return
        }
        case "section_name": {
          const currentSection = currentItem.sections[(currentItem.sections.length - 1) || 0]
          currentSection.name = trimedText
          return
        }
        case "parent_number": {
          const currentSection = currentItem.sections[(currentItem.sections.length - 1) || 0]
          currentSection.parent_code = trimedText
          return
        }
        default:
          return
      }
    }
  })
  
  saxStream.on("closetag", (tagName) => {
    currentTag = null
    
    if (tagName === "classificator") {
      result.push(currentItem)
      currentItem = null
    }
    
  })
  
  saxStream.on("end", async () => {
    console.log(`Обработка завершена.`)
    let i = 0
    for await (const classificator of result) {
      if (!classificator.name || !classificator.code || !classificator.description || classificator.sections.length < 2) continue
      i++
      console.log(`${i}. Type ${classificator.code} ${classificator.name} has been start processing`)
      const slug = slugify(classificator.name, { lower: true, strict: true })
      let memClassificator = memClassificators.find((item) => item.code === classificator.code)
      
      for await (const section of classificator.sections) {
        if (!section.name || !section.code) continue
        console.log(`${i}. Section ${section.code} ${section.name} has been start processing`)
        const slug = slugify(section.name, { lower: true, strict: true })
        let memSection = memSections.find((item) => item.code === section.code)
        let parentSection = memSections.find((item) => item.code === section.parent_code)
        
        if (!memSection) {
          const query = qs.stringify(
            {
              filters: {
                code: section.code,
              },
            },
            {
              encodeValuesOnly: true,
            },
          )
          const response = await api.get("api/device-sections", {
            params: new URLSearchParams(query),
          })
          if (response.data.data[0]) {
            memSection = response.data.data[0]
            memSections.push(memSection)
            
            if (parentSection) {
              try {
                await api.put(`api/device-sections/${memSection.documentId}`, {
                  data: {
                    parent: { connect: parentSection.documentId },
                  },
                })
              } catch (e) {
                console.log("151", e?.response?.data?.error, e?.response?.data?.error?.details)
                errorsList.push(e?.response?.data?.error?.details)
              }
            }
          } else {
            try {
              await api.post(`api/device-sections`, {
                data: {
                  slug,
                  code: section.code,
                  sort_code: toSortCode(section.code),
                  name: section.name,
                  ...(parentSection && { parent: { connect: parentSection.documentId } }),
                },
              })
            } catch (e) {
              console.log("165", e?.response?.data?.error, e?.response?.data?.error?.details)
              errorsList.push(e?.response?.data?.error?.details)
            }
          }
        }
      }
      const sectionsCodes = classificator.sections.map(item => item.code)
      const sectionsDocumentId = memSections
        .map(item => {
          if (sectionsCodes.includes(item.code)) return item.documentId
          return
        })
        .filter(item => Boolean(item))
      
      if (!memClassificator) {
        const query = qs.stringify(
          {
            filters: {
              code: classificator.code,
            },
          },
          {
            encodeValuesOnly: true,
          },
        )
        try {
          const response = await api.get("api/device-types", {
            params: new URLSearchParams(query),
          })
          if (response.data.data[0]) {
            memClassificator = response.data.data[0]
            memClassificators.push(response.data.data[0])
          }
        } catch (e) {
          console.log("198", e?.response?.data?.error, e?.response?.data?.error?.details)
          errorsList.push(e?.response?.data?.error?.details)
        }
      }
      
      if (!memClassificator) {
        try {
          const response = await api.post("api/device-types", {
            data: {
              slug,
              code: classificator.code,
              name: classificator.name,
              description: classificator.description,
              sections: { connect: sectionsDocumentId },
            },
          })
          if (response.data.data) {
            memClassificators.push(response.data.data)
          }
        } catch (e) {
          console.log("217", e?.response?.data?.error, e?.response?.data?.error?.details)
          errorsList.push(e?.response?.data?.error?.details)
        }
      } else {
        try {
          await api.put(`api/device-types/${memClassificator.documentId}`, {
            data: {
              sections: { connect: sectionsDocumentId },
            },
          })
        } catch (e) {
          console.log("227", e?.response?.data?.error, e?.response?.data?.error?.details)
          errorsList.push(e?.response?.data?.error?.details)
        }
      }
      
    }
    return
  })
  
  saxStream.on("error", (e) => {
    console.error("Ошибка парсинга:", e)
  })
  
  console.log("Начало потоковой загрузки и обработки XML...")
  try {
    const response = await axios.get(dataUrl, {
      responseType: "stream",
    })
    
    const unzipStream = unzipper.Parse({ forceStream: true })
    
    response.data.pipe(unzipStream)
    
    for await (const entry of unzipStream) {
      const fileName = entry.path
      const type = entry.type
      
      if (type === "File" && fileName.endsWith(".xml")) {
        console.log(`Найден XML-файл в архиве: ${fileName}. Начало парсинга...`)
        
        await entry.pipe(saxStream)
      } else {
        await entry.autodrain()
      }
    }
    console.log(errorsList)
  } catch (e) {
    console.error("Ошибка при загрузке файла:", e.message)
  }
}