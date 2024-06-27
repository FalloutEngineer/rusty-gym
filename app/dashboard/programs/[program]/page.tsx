import React from "react"

import { TrainingLevels } from "../../../enums"
import styles from "./styles.module.css"

import Image from "next/image"
import Link from "next/link"

type IProgramProps = {
  name: string
  id: string
  imageURL?: string
  difficulty: TrainingLevels
  trainings: any[]
}

export default function Program({
  name = "Upper body muscle gain Outdoors",
  id = "outdoorsGainUpperBeginner",
  imageURL,
  difficulty = TrainingLevels.BEGINNER,
  trainings = [
    { name: "Regular push ups", type: "pushUps", id: "regular" },
    { name: "Wide push ups", type: "pushUps", id: "wide" },
    { name: "Diamond push ups", type: "pushUps", id: "diamond" },
  ],
}: IProgramProps) {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        {imageURL && <Image src={imageURL} alt={""} />}
        <h2 className={styles.heading}>{name}</h2>
      </div>

      <div className={styles.trainings}>
        {trainings.map((training) => {
          return (
            <Link
              key={training.id}
              className={styles.training}
              href={"/dashboard/trainings/" + training.type + "/" + training.id}
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
