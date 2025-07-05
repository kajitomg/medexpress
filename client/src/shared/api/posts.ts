"use server"
/*
import { api } from "@/shared/api/api"
import axios from "axios"
import qs from "qs"

type Data = {
  code: string
  description: string
  name: string
  section: string
  section_name: string
  category: string
  category_name: string
}

export const fillDBNomenlature = async () => {
  const posts = await getAllPosts()
  let current_class: number | null = null
  let current_group: number | null = null
  let i = 0
  const list = new Map()

  for await (const post of posts) {
    const prev_post = i > 0 ? posts[i - 1] : null
    try {
      if (!post.category) {
        const response = await api({
          url: `/api/categories`,
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          data: {
            data: {
              title: post.section_name,
              code: post.section,
            },
          },
        })

        current_class = response.data.data.documentId

        continue
      }

      if (post.category !== prev_post?.category) {
        const response = await api({
          url: `/api/categories`,
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          data: {
            data: {
              title: post.category_name,
              code: post.category,
              description: post.description,
              parent: current_class,
            },
          },
        })

        current_group = response.data.data.documentId
      }
      if (list.has(post.name)) {
        await api({
          url: `/api/products/${list.get(post.name)}`,
          method: "PUT",
          headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          data: {
            data: {
              categories: { connect: [current_group] },
            },
          },
        })
      } else {
        const response = await api({
          url: `/api/products`,
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
          data: {
            data: {
              title: post.name,
              code: post.code,
              description: post.description,
              categories: { connect: [current_group] },
            },
          },
        })

        list.set(post.name, response.data.data.documentId)
      }
    } catch (e) {
      console.error(e)
    } finally {
      i++
    }
  }

  const response = await axios.get(`${process.env.API_PATH}/api/classes`, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  })

  return response.data
}

export const filldb = async (posts: Data[]) => {
  if (posts[0].category) return console.error("Error consistent posts data.")

  const parents: string[][] = []
  const mem = new Map()
  let index = 0
  let prevlevel: number | null = null

  try {
    for await (const post of posts) {
      if (!post.category) continue
      if (
        post.category &&
        post.category !== parents?.[parents.length - 1 || 0]?.[1]
      ) {
        if (parents.length === 0 || parents?.[0]?.[1] != post.section) {
          const body: {
            data: {
              title: string
              code: string
            }
          } = {
            data: {
              title: post.section_name,
              code: post.section,
            },
          }

          const response = await api({
            url: `/api/categories`,
            method: "POST",
            data: body,
          })
            .then(async (value) => {
              console.log(
                `${index}. Create category with documentId ${value.data.data.documentId} and add to database`
              )

              return value
            })
            .catch(async () => {
              const query = qs.stringify(
                {
                  fields: ["id", "documentId", "code"],
                  filters: {
                    title: post.section_name,
                  },
                },
                {
                  encodeValuesOnly: true,
                }
              )

              const response = await api({
                url: `/api/categories`,
                method: "GET",
                params: new URLSearchParams(query),
              })

              if (!response.data.data[0]) return null

              console.log(
                `${index}. Get category with documentId ${response.data.data[0].documentId} from database`
              )

              return {
                data: {
                  data: response.data.data[0],
                },
              }
            })

          parents[0] = [
            response?.data.data.documentId,
            response?.data.data.code,
          ]
        }

        const level = spcode(post.category || post.section)

        const body: {
          data: {
            title: string
            code: string
            description?: string
            parent?: string
          }
        } = {
          data: {
            title: post.category_name,
            code: post.category,
          },
        }

        if (post.category && prevlevel === level) {
          body.data.description = post.description
          body.data.parent = parents[parents.length - 2 || 0][0]
        } else if (post.category && prevlevel !== level) {
          body.data.description = post.description
          body.data.parent = parents[parents.length - 1][0]
        }

        prevlevel = level

        const response = await api({
          url: `/api/categories`,
          method: "POST",
          data: body,
        })
          .then(async (value) => {
            console.log(
              `${index}. Create category with documentId ${value.data.data.documentId} with parent ${body.data.parent} and add to database`
            )

            return value
          })
          .catch(async () => {
            const query = qs.stringify(
              {
                fields: ["id", "documentId", "code"],
                filters: {
                  title: post.category_name || post.section_name,
                },
              },
              {
                encodeValuesOnly: true,
              }
            )

            const response = await api({
              url: `/api/categories`,
              method: "GET",
              params: new URLSearchParams(query),
            })

            if (!response.data.data[0]) return null

            console.log(
              `${index}. Get category with documentId ${response.data.data[0].documentId} from database`
            )

            return {
              data: {
                data: response.data.data[0],
              },
            }
          })

        if (!response?.data.data)
          return console.error(
            `${index}. Error creating or getting category data.`
          )

        const data = [response?.data.data.documentId, response?.data.data.code]

        parents.splice(level, parents.length - level, data)
      }
      if (mem.has(post.name)) {
        const body = {
          data: {
            categories: { connect: [...parents].map((parent) => parent[0]) },
          },
        }
        await api({
          url: `/api/products/${mem.get(post.name)}`,
          method: "PUT",
          data: body,
        }).then(async (value) => {
          console.log(
            `${index}. Updated product with documentId ${value.data.data.documentId} and add parent ${parents[parents.length - 1][0]}`
          )
          return value
        })
      } else {
        const body = {
          data: {
            title: post.name,
            code: post.code,
            description: post.description,
            categories: { connect: [...parents].map((parent) => parent[0]) },
          },
        }
        const response = await api({
          url: `/api/products`,
          method: "POST",
          data: body,
        })
          .then(async (value) => {
            console.log(
              `${index}. Create product with documentId ${value.data.data.documentId} and add to database`
            )
            return value
          })
          .catch(async () => {
            const query = qs.stringify(
              {
                fields: ["id", "documentId", "code"],
                filters: {
                  title: post.name,
                },
              },
              {
                encodeValuesOnly: true,
              }
            )

            const response = await api({
              url: `/api/products`,
              method: "GET",
              params: new URLSearchParams(query),
            })

            if (!response.data.data[0]) return null

            console.log(
              `${index}. Get product with documentId ${response.data.data[0].documentId} from database`
            )

            const body = {
              data: {
                categories: {
                  connect: [...parents].map((parent) => parent[0]),
                },
              },
            }
            await api({
              url: `/api/products/${response.data.data[0].documentId}`,
              method: "PUT",
              data: body,
            }).then(async (value) => {
              console.log(
                `${index}. Updated product with documentId ${value.data.data.documentId} and add parent ${parents[parents.length - 1][0]}`
              )
              return value
            })

            return {
              data: {
                data: response.data.data[0],
              },
            }
          })
        if (!response?.data.data)
          return console.error(
            `${index}. Error creating or getting product data.`
          )

        mem.set(post.name, response.data.data.documentId)
      }

      index++
    }
  } catch (e) {
    console.log(e)
  }
}

const spcode = (code: string) => {
  return code.split(".").length - 1
}

export const getAllPosts = async () => {
  
  const categories = [
    1, 280, 337, 354, 376, 409, 426, 446, 455, 28, 51, 79, 116, 130, 156, 183,
    198, 206, 264, 1040,
  ]

  const sortedCategories = [...categories].sort((a, b) => a - b)

  const secondItemIndex = sortedCategories.findIndex((category) => {
    return category === categories[1]
  })
  /*const secondItemGap = [
    sortedCategories[secondItemIndex],
    sortedCategories?.[secondItemIndex + 1]
      ? sortedCategories?.[secondItemIndex + 1] - 1
      : sortedCategories?.[secondItemIndex],
  ]

  const params = {
    draw: "1",
    "order[0][column]": "1",
    "order[0][dir]": "asc",
    start: "0",
    length: "32770",
    categories: [
      1, 280, 337, 354, 376, 409, 426, 446, 455, 28, 51, 79, 116, 130, 156, 183,
      198, 206, 264,
    ],
  }
  const response = await axios.post(
    "http://localhost:3001/proxy",
    {},
    {
      params: new URLSearchParams(params),
    }
  )
  const data: Data[] = response.data.data.map((item) => {
    item.col2.label = parseLine(item.col2.label)
    return {
      code: item.col1.label,
      name: item.col3.label,
      description: item.col4.label,
      section: item.col2.label[0],
      section_name: item.col2.label[1],
      category: item.col2.label?.[2],
      category_name: item.col2.label?.[3],
    }
  })

  return data
}

const parseLine = (line) => {
  const regex =
    /(\d+)\.\s([^\n<]+)(?:\s*<br>&nbsp;&nbsp;(\d+\.\d+)\.\s([^\n<]+))?/

  const match = line.match(regex)
  if (match) {
    const [, id, name, subId, subName] = match
    const result = [id, name.trim()]
    if (subId && subName) {
      result.push(subId, subName.trim())
    }
    return result
  }
  return null
}

export const getOnePost = async () => {}
export const getAllClasses = async () => {}
export const getAllGroups = async () => {}
export const getAllTypes = async () => {}
export const getAllModels = async () => {}
*/