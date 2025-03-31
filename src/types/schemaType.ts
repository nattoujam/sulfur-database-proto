type DbCommon = {
  id: number
  createdAt: string
  updatedAt: string
}

export type Item = DbCommon & {
  name: string
  tradeInPrice: number
  price: number
  size: number
}
export type Material = DbCommon & {
  recipeId: number
  itemId: number
  amount: number
  item: Item
}
export type Recipe = DbCommon & {
  resultId: number
  amount: number
  result: Item
  materials: Array<Material>
}
