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
          title={"Free Trainings"}
          href={"./dashboard/freeTrainings"}
          image={"/next.svg"}
        />
        <MenuButton
          title={"Program"}
          href={"./dashboard/program"}
          image={"/vercel.svg"}
        />
      </Grid>
    </div>
  )
}
