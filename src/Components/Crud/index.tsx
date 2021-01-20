import React, { FC, useEffect, useState } from "react"
import classes from "./crud.module.css"
import {
  CRUD_DATA,
  CRUD_VARIENT,
  READ_URL,
  DELETE_URL,
} from "./../../Types/crud.interface"
import CreateComp from "./Create"
import Item from "./Item"
import toast from "react-hot-toast"

type Props = {}
interface StateType extends CRUD_DATA {
  loading: boolean
  error: null | string
  currVarient: CRUD_VARIENT

  list: CRUD_DATA[]
}
const DefaultValue: StateType = {
  id: null,
  name: "",
  price: 0,
  stock_qty: 0,
  loading: false,
  error: null,
  currVarient: "CREATE",
  list: [],
}
const CrudComp: FC<Props> = () => {
  const [state, setObjState] = useState<StateType>(DefaultValue)
  const setState = (obj: Partial<StateType>) =>
    setObjState(p => ({ ...p, ...obj }))

  useEffect(() => {
    getAllProducts()
  }, [])
  const listHandler = (data: CRUD_DATA, reason: CRUD_VARIENT) => {
    let shallowList = [...state.list]
    if (reason === "CREATE") {
      shallowList.push(data)
    } else if (reason === "UPDATE") {
      shallowList = shallowList.map(o => {
        if (o.id === data.id) {
          return {
            ...data,
          }
        } else {
          return o
        }
      })
    }

    setState({
      list: shallowList,
      currVarient: "CREATE",
      id: null,
      name: "",
      price: 0,
      stock_qty: 0,
    })
  }
  const getAllProducts = async () => {
    try {
      setState({ loading: true })
      const response = await (await fetch(READ_URL)).json()
      if (response?.result === "failed") {
        setState({ error: response?.message || "There is something wrong." })
      }

      if (response?.result === "success") {
        const arr = response.data || []
        setState({ list: arr })
      }
    } catch (err) {
      console.log(err, err?.body?.message)
    } finally {
      setState({ loading: false })
    }
  }
  const onDeleteProducts = async (id: string) => {
    try {
      setState({ loading: true })
      const response = await (
        await fetch(DELETE_URL, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            docId: id,
          }),
        })
      ).json()
      if (response?.result === "failed") {
        setState({
          error: response?.message || "Item is not deleted, Try again latter..",
        })
      }

      if (response?.result === "success") {
        const filteredList = [...state.list].filter(o => o.id !== id)
        setState({ list: filteredList })
        toast("Item Deleted successfully", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "var(--purple)",
            color: "#fff",
          },
        })
      }
    } catch (err) {
      console.log(err, err?.body?.message)
    } finally {
      setState({ loading: false })
    }
  }
  const onUpdateProducts = (data: CRUD_DATA) => {
    setState({
      id: data.id,
      name: data.name,
      price: data.price,
      stock_qty: data.stock_qty,
      currVarient: "UPDATE",
    })
  }
  return (
    <div className={classes.crudWrapper}>
      <CreateComp
        varient={state.currVarient}
        defaultValues={{
          id: state.id,
          name: state.name,
          price: state.price,
          stock_qty: state.stock_qty,
        }}
        pushIntoList={listHandler}
      />
      <div className={classes.listWrapper}>
        {state.loading ? (
          <div>Loading...</div>
        ) : !state.error ? (
          state.list.map((data, i) => {
            return (
              <Item
                key={data.id}
                data={data}
                actions={
                  <div className={classes.actions}>
                    <button
                      className="primary-btn info-bg"
                      type="button"
                      onClick={() => onUpdateProducts(data)}
                    >
                      update
                    </button>
                    <button
                      className="primary-btn t-bg warning-clr"
                      type="button"
                      onClick={() => onDeleteProducts(data.id)}
                    >
                      delete
                    </button>
                  </div>
                }
                activeId={state.id}
              />
            )
          })
        ) : (
          <p className="error">{`${state.error}`}</p>
        )}
      </div>
    </div>
  )
}

export default CrudComp
