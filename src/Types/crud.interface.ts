export interface CRUD_DATA {
  id?: string
  name: string
  price: number
  stock_qty: number
}

export type Crud_List_Type = CRUD_DATA[]
export type CRUD_VARIENT = "CREATE" | "UPDATE"

export const CREATE_URL = "/.netlify/functions/create"
export const READ_URL = "/.netlify/functions/read"
export const UPDATE_URL = "/.netlify/functions/update"
export const DELETE_URL = "/.netlify/functions/delete"
