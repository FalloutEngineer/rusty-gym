"use client"
import React, { useEffect, useState } from "react"

import { GetStaticPaths } from "next"

import Grid from "@/app/components/Dashboard/Grid"
import MenuButton from "@/app/components/Dashboard/MenuButton"

import styles from "../../dashboard.module.css"
import { usePathname, useRouter } from "next/navigation"
import { CategoryType } from "@/app/types"
import {
  getAllTrainingsInCategory,
  getCategories,
} from "@/app/services/getTrainingsService"

export default function Trainings() {
  const router = useRouter()

  const category = usePathname().split("/").pop()

  const [categories, setCategories] = useState<Array<String>>()

  const [trainings, setTrainings] = useState<Array<any>>()

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await getCategories()

      if (categoriesRaw) {
        const categoriesStrings = categoriesRaw.map((category) => category.id)

        if (category) {
          if (categoriesStrings.includes(category)) {
            setCategories(categoriesStrings)
          } else {
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
        const trainingsRaw = await getAllTrainingsInCategory(category)
        console.log(trainingsRaw)
      }
    }

    fetchData()
    fetchTrainings()
  }, [])

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashHeading}>{category}</h2>
      <Grid>
        {/* {category.trainings.map((training) => {
          return (
            <MenuButton
              title={training.name}
              href={"./" + categoryURL + "/" + training.url}
              image={training.imageUrl}
              key={training.url}
            />
          )
        })} */}
        {/* {categories
          ? categories.map((category) => {
              console.log(category)
              // return <MenuButton key={category.id} title={category.id} href={"./" + category.id + "/" + training.url} image={undefined} />
            })
          : ""} */}
        {""}
      </Grid>
    </div>
  )
}
