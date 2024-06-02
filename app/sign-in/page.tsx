"use client"
import React, { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { SignupInputs } from "../types"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/app/firebase/config"

import styles from "../styles/auth.module.css"
import { useRouter } from "next/navigation"

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupInputs>()

  const router = useRouter()

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(data.email, data.password)
      sessionStorage.setItem("user", "true")
      console.log(res)
      reset()
      router.push("/")
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.heading}>Sign in</h2>
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
            <input type="submit" className={styles.submit} value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  )
}
