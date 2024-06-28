"use client"
import React from "react"

import { TrainingLevels } from "../../../enums"
import styles from "./styles.module.css"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { programsObject } from "../../../programs"
import { ProgramObject, TrainingObject } from "@/app/types"

import data from "../../../data/trainings.json"

export default function Program() {
  const pathname = usePathname()

  const programName = pathname.split("/").pop()
  let section = programsObject.sections.find((section) => {
    return section.programs.find((program) => {
      return program.id === programName
    })
  })

  let program: ProgramObject | undefined = undefined

  if (section) {
    program = section.programs.find((program) => {
      return program.id === programName
    })
  }

  if (program === undefined) {
    program = {
      id: "error",
      level: TrainingLevels.BEGINNER,
      name: "error",
      trainings: [],
    }
  }

  const trainingsTemp: any[] = program.trainings.map((trainingPath) => {
    const category = data.trainings.find((category) => {
      return category.categoryUrl === trainingPath.categoryUrl
    })

    const training = category?.trainings.find((training) => {
      return training.url === trainingPath.url
    })

    return { categoryUrl: trainingPath.categoryUrl, ...training }
  })

  const trainings: TrainingObject[] = trainingsTemp.filter(
    (training) => training
  )

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        {program.imageURL !== null && program.imageURL !== undefined && (
          <Image src={program.imageURL} alt={""} />
        )}
        <h2 className={styles.heading}>{program.name}</h2>
      </div>

      <div className={styles.trainings}>
        {trainings.map((training) => {
          return (
            <Link
              key={training.url}
              className={styles.training}
              href={
                "/dashboard/trainings/" +
                training.categoryUrl +
                "/" +
                training.url
              }
            >
              {training.imageURL ? (
                <Image src={training.imageURL} alt={""} />
              ) : (
                <figure className={styles.trainingImagePlaceholder}></figure>
              )}
              <div className={styles.trainingLower}>
                <h3 className={styles.trainingHeading}>{training.name}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
