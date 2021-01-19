import { FC, useState } from "react"
import classes from "./crud.modules.css"
import {
  CRUD_DATA,
  CREATE_URL,
  CRUD_VARIENT,
  UPDATE_URL,
} from "./../../Types/crud.interface"
import { useForm, SubmitHandler } from "react-hook-form"
type Props = {
  pushIntoList?: (data: CRUD_DATA, varient: CRUD_VARIENT) => void
  varient: CRUD_VARIENT
  defaultValues: CRUD_DATA
}

const CreateComp: FC<Props> = ({ pushIntoList, varient, defaultValues }) => {
  const { register, errors, handleSubmit } = useForm<Omit<CRUD_DATA, "id">>({
    defaultValues: defaultValues,
  })
  const [err, setErr] = useState<null | string>(null)

  const onSubmitForm: SubmitHandler<Omit<CRUD_DATA, "id">> = async data => {
    try {
      const url: string = varient === "CREATE" ? CREATE_URL : UPDATE_URL
      const result = await await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          ...data,
          ...(varient === "UPDATE" && { docId: defaultValues.id }),
        }),
      })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={classes.createView}>
      <h2>Create Product</h2>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="p_name">Product Name</label>
          <input
            id="p_name"
            name="name"
            type="text"
            ref={register({ required: true })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label htmlFor="p_price">price</label>
          <input
            id="p_price"
            name="price"
            type="number"
            ref={register({ required: true })}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <label htmlFor="p_stock_qty">Stock Quantity</label>
          <input
            id="p_stock_qty"
            name="stock_qty"
            type="number"
            ref={register({ required: true })}
          />
          {errors.stock_qty && <p className="error">{errors.stock_qty}</p>}
          <hr />
          <button type="submit" className="primary-btn">
            {varient}
          </button>
        </form>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  )
}

export default CreateComp
