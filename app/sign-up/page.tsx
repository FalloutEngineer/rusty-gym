"use client"
import React, { useState } from "react"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = () => {
    console.log(`Signed up: ${{ email, password }}`)
  }
  return <div>page</div>
}
