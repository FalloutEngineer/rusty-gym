"use client"
import React from "react"

import data from "../../../data/trainings.json"

export default function Trainings(props: any) {
  const category = data.trainings.filter((categories) => {
    return categories.categoryUrl === props.params.category
  })[0]

  return <div>{category.categoryName}</div>
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
