import React from "react"

import styles from "./footer.module.css"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className={styles.footer + " " + styles.container}>
      <div className={styles.footerUpper}>
        <div className={styles.footerLogo}>
          Rusty<span className={styles.logoHighlighted}>Gym</span>
        </div>
      </div>
      <div className={styles.footerLower}>
        <span className={styles.copyright}>
          Copyright 2024. RustyGym. All rights reserved.
        </span>
        <div className={styles.footerLinks}>
          <Link className={styles.footerLink} href={"./privacy"}>
            Privacy Policy
          </Link>
          <Link className={styles.footerLink} href={"./about"}>
            About
          </Link>
        </div>
      </div>
    </footer>
  )
}
