import React from "react"

import styles from "../dashboard.module.css"
import Grid from "../../components/Dashboard/Grid"
import MenuButton from "../../components/Dashboard/MenuButton"

export default function FreeTrainings() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashHeading}>Trainings</h1>
      <Grid>
        <MenuButton
          title={"Push Ups"}
          href={"/dashboard/trainings/pushUps"}
          image={"/next.svg"}
        />
        <MenuButton
          title={"Pull Ups"}
          href={"/dashboard/trainings/pullUps"}
          image={"/vercel.svg"}
        />
        <MenuButton
          title={"Core"}
          href={"/dashboard/trainings/core"}
          image={"/vercel.svg"}
        />
        <MenuButton
          title={"Dips"}
          href={"/dashboard/trainings/dips"}
          image={"/vercel.svg"}
        />
        <MenuButton
          title={"Bottom"}
          href={"/dashboard/trainings/bottom"}
          image={"/vercel.svg"}
        />
        <MenuButton
          title={"Elements"}
          href={"/dashboard/trainings/elements"}
          image={"/vercel.svg"}
        />
      </Grid>
    </div>
  )
}
