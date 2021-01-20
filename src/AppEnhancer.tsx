import React, { FC, Fragment } from "react"
import { Toaster } from "react-hot-toast"
const Index: FC = ({ children }) => {
  return (
    <div style={{ maxWidth: "var(--maxWidth)", margin: "auto" }}>
      {children}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  )
}

export default Index
