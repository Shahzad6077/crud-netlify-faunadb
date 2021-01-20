import React, { FC } from "react"
import { CRUD_DATA } from "../../Types/crud.interface"
import classes from "./crud.module.css"

type Props = {
  actions?: React.ReactNode
  data: CRUD_DATA
  activeId?: string
}

const Item: FC<Props> = ({ actions, data, activeId }) => {
  return (
    <div
      className={`${classes.itemWrapper}  ${
        activeId === data.id && "info-bg "
      }`}
    >
      <div className={classes.itemWrapper__content}>
        <ul>
          {Object.entries(data).map((kvArr, i) => {
            return (
              <li key={i}>
                <span>{kvArr[0]}:</span>
                <span>{kvArr[1]}</span>
              </li>
            )
          })}
        </ul>
      </div>
      {actions && <div className={classes.itemActions}>{actions}</div>}
    </div>
  )
}
export default Item
