import React, { FC } from "react"
import { CrudComp, SEO } from "../Components"

type Props = {}

const Index: FC<Props> = () => {
  return (
    <div>
      <SEO title="CRUD" />
      <CrudComp />
    </div>
  )
}

export default Index
