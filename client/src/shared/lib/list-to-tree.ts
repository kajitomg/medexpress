/*
export const listToTree = <T extends { childrens?: T[] }>(
  input_list: T[],
  parent_field_name: keyof T,
  equal_field_name: keyof T
) => {
  input_list = [...input_list]
  const result_tree: T[] = []

  for (const input_item of input_list) {
    const parent_field = input_item[parent_field_name] as T

    if (!parent_field) {
      result_tree.push({ ...input_item, childrens: [] })
      continue
    }
    for (const result_item of result_tree) {
      if (
        result_item?.[equal_field_name] === parent_field?.[equal_field_name]
      ) {
        result_item.childrens?.push({
          ...input_item,
        })
      }
    }
  }

  return result_tree
}
*/
export const listToTree = <T, E extends { childrens?: T[] }>(
  input_list: T[],
  parent_field_name: keyof T,
  equal_field_name: keyof T
): (T & E)[] => {
  input_list = [...input_list]
  const childrens_ids = new Map<string, T[]>()
  const result_tree: (T & E)[] = []

  for (const input_item of input_list) {
    const parent_field = input_item[parent_field_name] as T | null
    let childrens: T[] = []

    if (!parent_field) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      result_tree.push({ ...input_item, childrens: [] })
      continue
    }
    const parent_equal_field = parent_field[equal_field_name] as string

    if (childrens_ids.has(parent_equal_field)) {
      childrens = childrens_ids.get(parent_equal_field) || []
    }
    childrens.push(input_item)
    childrens_ids.set(parent_equal_field, childrens)
  }

  for (const result_item of result_tree) {
    const item_equal_field = result_item[equal_field_name] as string
    if (childrens_ids.has(item_equal_field)) {
      const childrens: T[] = childrens_ids.get(item_equal_field) || []

      result_item.childrens = childrens
    }
  }

  return result_tree
}
