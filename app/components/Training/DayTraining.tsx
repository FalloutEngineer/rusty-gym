"use client"
import React from "react"

import styles from "./dayTraining.module.css"

interface IDayTrainingProps {
  onClick: () => void
  restTime?: number
  day?: number
  reps?: number[]
  isComplete?: boolean
}

export default function DayTraining({
  onClick,
  restTime = 60,
  day = 1,
  reps = [1, 1, 1, 1, 1],
  isComplete = false,
}: IDayTrainingProps) {
  return (
    <button className={styles.dayItemButtonWrapper} onClick={onClick}>
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

        {isComplete ? (
          <div className={styles.completion + " " + styles.complete}>V</div>
        ) : (
          <div className={styles.completion}>&gt;</div>
        )}
      </div>
    </button>
  )
}
