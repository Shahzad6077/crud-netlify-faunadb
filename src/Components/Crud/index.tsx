import { FC, useState } from "react"
import classes from "./crud.modules.css"
import { CRUD_DATA, CRUD_VARIENT } from "./../../Types/crud.interface"
import CreateComp from "./Create"

type Props = {}
interface StateType extends CRUD_DATA {
  loading: boolean
  error: null | string
  currVarient: CRUD_VARIENT
}
const DefaultValue: StateType = {
  id: null,
  name: "",
  price: 0,
  stock_qty: 0,
  loading: false,
  error: null,
  currVarient: "CREATE",
}
const CrudComp: FC<Props> = () => {
  const [state, setObjState] = useState<StateType>(DefaultValue)
  const setState = (obj: Partial<StateType>) =>
    setObjState(p => ({ ...p, ...obj }))

  const listHandler = (data: CRUD_DATA, reason: CRUD_VARIENT) => {
    //
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
    </div>
  )
}

export default CrudComp
