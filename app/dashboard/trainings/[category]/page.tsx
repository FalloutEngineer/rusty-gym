"use client"
import React, { useEffect, useState } from "react"

import Grid from "@/app/components/Dashboard/Grid"
import MenuButton from "@/app/components/Dashboard/MenuButton"

import styles from "../../dashboard.module.css"
import { usePathname, useRouter } from "next/navigation"

import {
  getAllTrainingsInCategory,
  getCategories,
} from "@/app/services/getTrainingsService"

export default function Trainings() {
  const router = useRouter()

  const category = usePathname().split("/").pop()

  const [trainings, setTrainings] = useState<Array<any>>()

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await getCategories()

      if (categoriesRaw) {
        const categoriesStrings = categoriesRaw.map((category) => category.id)

        if (category) {
          if (!categoriesStrings.includes(category)) {
            router.replace("/404")
          }
        } else {
          router.replace("/404")
        }
      } else {
        router.replace("/404")
      }
    }

    const fetchTrainings = async () => {
      if (category) {
        const trainings = await getAllTrainingsInCategory(category)

        if (trainings) {
          setTrainings(trainings)
        }
      }
    }

    fetchData()
    fetchTrainings()
  }, [])

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashHeading}>{category}</h2>
      <Grid>
        {trainings
          ? trainings.map((training) => {
              return (
                <MenuButton
                  key={training.id}
                  title={training.strings.EN.name}
                  href={"./" + category + "/" + training.id}
                  image={training.imageURL}
                />
              )
            })
          : ""}
      </Grid>
    </div>
  )
}
