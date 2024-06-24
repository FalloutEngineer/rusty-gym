"use client"
import React from "react"

import styles from "./dayTraining.module.css"
import Link from "next/link"

interface IDayTrainingProps {
  link: string
  restTime?: number
  day?: number
  reps?: number[]
  isEnabled?: boolean
  isComplete?: boolean
}

export default function DayTraining({
  link,
  restTime = 60,
  day = 1,
  reps = [1, 1, 1, 1, 1],
  isEnabled = true,
  isComplete = false,
}: IDayTrainingProps) {
  const isDisabled = !isEnabled || isComplete
  return (
    <Link
      className={
        styles.dayItemButtonWrapper + " " + (isDisabled ? styles.disabled : "")
      }
      aria-disabled={!isEnabled}
      tabIndex={isEnabled ? undefined : -1}
      href={link}
    >
      <div className={styles.dayLeft}>
        <span className={styles.dayNumber}>{day}</span> <span>Day</span>
      </div>
      <div className={styles.dayRight}>
        <div className={styles.dayRightCenter}>
          <ul className={styles.dayApproaches}>
            <li className={styles.dayApproach}>{reps[0]}</li>
            <li className={styles.dayApproach}>{reps[1]}</li>
            <li className={styles.dayApproach}>{reps[2]}</li>
            <li className={styles.dayApproach}>{reps[3]}</li>
            <li className={styles.dayApproach}>{reps[4]}</li>
          </ul>
          <span className={styles.restTime}>Rest time {restTime} sec</span>
        </div>

        {isEnabled &&
          (isComplete ? (
            <div className={styles.completion + " " + styles.complete}>V</div>
          ) : (
            <div className={styles.completion}>&gt;</div>
          ))}
      </div>
    </Link>
  )
}
