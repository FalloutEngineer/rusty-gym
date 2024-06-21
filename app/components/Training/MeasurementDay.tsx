"use client"
import React from "react"

import styles from "./dayTraining.module.css"

interface IMeasurementDayProps {
  onClick: () => void
}

export default function MeasurementDay({ onClick }: IMeasurementDayProps) {
  return (
    <button className={styles.dayItemButtonWrapper} onClick={onClick}>
      <div className={styles.dayLeft}>
        <span>Test</span>
      </div>
      <div className={styles.dayRight}>
        <div className={styles.dayRightCenter}>
          <span className={styles.restTime}>Do as many reps as you can</span>
        </div>
      </div>
    </button>
  )
}
