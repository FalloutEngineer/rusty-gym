import React from "react"

import styles from "./dashboard.module.css"
import Grid from "../components/Dashboard/Grid"
import MenuButton from "../components/Dashboard/MenuButton"

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashHeading}>Dashboard</h1>
      <Grid>
        <MenuButton
          title={"Free Train"}
          href={"./freeTraining"}
          image={"/next.svg"}
        />
        <MenuButton
          title={"Program"}
          href={"./training"}
          image={"/vercel.svg"}
        />
      </Grid>
    </div>
  )
}
