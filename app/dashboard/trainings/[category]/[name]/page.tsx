import React, { useEffect, useState } from "react"

import data from "../../../../data/trainings.json"

export default function Training() {
  return <div>Training</div>
}

export async function getStaticPaths() {
  const paths: { params: { category: string; name: string } }[] = []

  console.log(data.trainings)

  data.trainings.forEach((category) => {
    category.trainings.forEach((training) => {
      paths.push({
        params: {
          category: category.categoryUrl,
          name: training.url,
        },
      })
    })
  })

  return {
    paths: paths,
    fallback: false,
  }
}

// export async function getStaticProps({ params }) {}
