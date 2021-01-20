import * as yup from "yup"

const crudSchema = yup.object().shape({
  name: yup.string().required("Product name is required."),
  price: yup
    .number()
    .positive("Price is must be in positive.")
    .required("Price is required."),
  stock_qty: yup
    .number()
    .positive()
    .integer("Stock quantity is must be integers.")
    .required("Stock quantity is required."),
})
export default crudSchema
