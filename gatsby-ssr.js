import React from "react"
import AppEnhancer from "./src/AppEnhancer"

export const wrapRootElement = ({ element }) => (
  <AppEnhancer>{element}</AppEnhancer>
)
