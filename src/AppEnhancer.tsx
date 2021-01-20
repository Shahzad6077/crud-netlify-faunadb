import React, { FC, Fragment } from "react"
import { Toaster } from "react-hot-toast"
import { Layout } from "./Components"
const Index: FC = ({ children }) => {
  return (
    <Layout>
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </Layout>
  )
}

export default Index
