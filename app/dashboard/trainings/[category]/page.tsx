"use client"
import React from "react"

import data from "../../../data/trainings.json"
import Grid from "@/app/components/Dashboard/Grid"
import MenuButton from "@/app/components/Dashboard/MenuButton"

import styles from "../../dashboard.module.css"

export default function Trainings(props: any) {
  const category = data.trainings.filter((categories) => {
    return categories.categoryUrl === props.params.category
  })[0]

  const categoryURL = category.categoryUrl

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.dashHeading}>{category.categoryName}</h2>
      <Grid>
        {category.trainings.map((training) => {
          return (
            <MenuButton
              title={training.name}
              href={"./" + categoryURL + "/" + training.url}
              image={training.imageUrl}
              key={training.url}
            />
          )
        })}
      </Grid>
    </div>
  )
}

export async function getStaticPaths() {
  const paths: { params: { category: string } }[] = []

  data.trainings.forEach((category) => {
    paths.push({
      params: {
        category: category.categoryUrl,
      },
    })
  })

  return {
    paths: paths,
    fallback: false,
  }
}
