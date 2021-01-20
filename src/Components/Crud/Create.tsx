import React, { FC, useEffect, useState } from "react"
import classes from "./crud.module.css"
import {
  CRUD_DATA,
  CREATE_URL,
  CRUD_VARIENT,
  UPDATE_URL,
} from "./../../Types/crud.interface"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import crudSchema from "./../../Validations/crud"
import { toast } from "react-hot-toast"

type Props = {
  pushIntoList: (data: CRUD_DATA, varient: CRUD_VARIENT) => void
  varient: CRUD_VARIENT
  defaultValues: CRUD_DATA
}

const CreateComp: FC<Props> = ({ pushIntoList, varient, defaultValues }) => {
  const { register, errors, handleSubmit, reset, setValue } = useForm<
    Omit<CRUD_DATA, "id">
  >({
    defaultValues: defaultValues,
    resolver: yupResolver(crudSchema),
  })
  const id = defaultValues.id

  useEffect(() => {
    if (id) {
      setValue("name", defaultValues.name, { shouldValidate: true })
      setValue("price", defaultValues.price, { shouldValidate: true })
      setValue("stock_qty", defaultValues.stock_qty, { shouldValidate: true })
    } else {
    }
  }, [id])

  const [err, setErr] = useState<null | string>(null)

  const onSubmitForm: SubmitHandler<Omit<CRUD_DATA, "id">> = async data => {
    try {
      const url: string = varient === "CREATE" ? CREATE_URL : UPDATE_URL
      const response = await (
        await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            ...data,
            ...(varient === "UPDATE" && { docId: defaultValues.id }),
          }),
        })
      ).json()
      if (response?.result === "failed") {
        setErr(response?.message)
      }

      if (response?.result === "success") {
        toast.success(`Product ${varient.toLowerCase()} Successfully.`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "var(--white)",
          },
        })
        pushIntoList(response.data, varient)
        reset()
      }
    } catch (err) {
      console.log(err.body.message)
    }
  }

  return (
    <div className={classes.createView}>
      <h2>
        <span style={{ textTransform: "capitalize" }}>
          {varient.toLowerCase()}
        </span>{" "}
        Product
      </h2>
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <label htmlFor="p_name">Product Name</label>
          <input
            id="p_name"
            name="name"
            type="text"
            ref={register({ required: true })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <label htmlFor="p_price">price</label>
          <input
            id="p_price"
            name="price"
            type="number"
            ref={register({ required: true })}
          />
          {errors.price && <p className="error">{errors.price.message}</p>}
          <label htmlFor="p_stock_qty">Stock Quantity</label>
          <input
            id="p_stock_qty"
            name="stock_qty"
            type="number"
            ref={register({ required: true })}
          />
          {errors.stock_qty && (
            <p className="error">{errors.stock_qty.message}</p>
          )}
          {/* <b r /> */}
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
