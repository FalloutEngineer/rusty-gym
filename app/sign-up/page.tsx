"use client"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignupInputs } from "../types"

import styles from "./styles.module.css"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>()

  const onSubmit: SubmitHandler<SignupInputs> = (data) => console.log(data)

  const handleSignUp = () => {
    console.log(`Signed up: ${{ email, password }}`)
  }
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form__group}>
            <label htmlFor="emailInput" className={styles.form__label}>
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              id="emailInput"
              className={styles.field}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          <div className={styles.form__group}>
            <label htmlFor="passwordInput" className={styles.form__label}>
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              id="passwordInput"
              className={styles.field}
              {...register("password", { required: true })}
            />
          </div>
          <div className={styles.form__group}>
            <input type="submit" className={styles.submit} />
          </div>
        </form>
      </div>
    </div>
  )
}
