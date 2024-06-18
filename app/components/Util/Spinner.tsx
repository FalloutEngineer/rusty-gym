import React from "react"
import Image from "next/image"
import loader from "./spinner.gif"

export const Spinner = () => {
  return (
    <div>
      <Image src={loader} alt="loading..." />
    </div>
  )
}
