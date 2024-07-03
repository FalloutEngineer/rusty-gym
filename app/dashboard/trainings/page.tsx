"use client"
import React, { useEffect, useState } from "react"

import styles from "../dashboard.module.css"
import Grid from "../../components/Dashboard/Grid"
import MenuButton from "../../components/Dashboard/MenuButton"
import { getCategories } from "@/app/services/getTrainingsService"

type CategoryType = {
  id: string
  imageURL: string
}

export default function FreeTrainings() {
  const [categories, setCategories] = useState<Array<CategoryType>>()

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories()

      if (categories) {
        setCategories(categories.reverse())
      }
    }

    fetchData()
  }, [])

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashHeading}>Trainings</h2>
      <Grid>
        {categories?.map((category) => {
          return (
            <MenuButton
              key={category.id}
              title={category.id}
              href={"/dashboard/trainings/" + category.id}
              image={category.imageURL === "" ? "/next.svg" : category.imageURL}
            />
          )
        })}
      </Grid>
    </div>
  )
}
