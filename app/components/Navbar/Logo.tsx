import React from "react"

import styles from "./logo.module.css"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1 className={styles.heading}>
        Rusty<span className={styles.logoHighlighted}>Gym</span>
      </h1>
    </Link>
  )
}
