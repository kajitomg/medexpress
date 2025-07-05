export default {
  getAllPosts: async () => {
    const categories = [
      1, 280, 337, 354, 376, 409, 426, 446, 455, 28, 51, 79, 116, 130, 156, 183,
      198, 206, 264, 1040,
    ]

    const sortedCategories = [...categories].sort((a, b) => a - b)

    const secondItemIndex = sortedCategories.findIndex((category) => {
      return category === categories[1]
    })
    const secondItemGap = [
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
      length: "10",
    }
    const response = await axios.post(
      "http://localhost:3001/proxy",
      {},
      {
        params: new URLSearchParams(params),
      },
    )

    const data = response.data.data.map((item) => {
      return {
        code: item.col1.label,
        section: item.col2.label,
        name: item.col3.label,
        description: item.col4.label,
      }
    })
    return data
  },
  getOnePost: () => {},
  getAllClasses: () => {},
  getAllGroups: () => {},
  getAllTypes: () => {},
  getAllModels: () => {},
}