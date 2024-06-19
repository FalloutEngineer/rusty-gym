import React from "react"

import styles from "./dashboard.module.css"
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs"

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashUpper}>
          <Breadcrumbs />
        </div>

        {children}
      </div>
    </div>
  )
}
