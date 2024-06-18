import React from "react"

import styles from "./dashboard.module.css"

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>{children}</div>
    </div>
  )
}
