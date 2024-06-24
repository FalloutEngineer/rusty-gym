"use client"
import React from "react"

import styles from "./dayTraining.module.css"
import Link from "next/link"

interface IMeasurementDayProps {
  link: string
  isEnabled?: boolean
}

export default function MeasurementDay({
  link,
  isEnabled = false,
}: IMeasurementDayProps) {
  return (
    <Link
      className={
        styles.dayItemButtonWrapper + " " + (!isEnabled ? styles.disabled : "")
      }
      href={link}
      aria-disabled={!isEnabled}
      tabIndex={isEnabled ? undefined : -1}
    >
      <div className={styles.dayLeft}>
        <span>Test</span>
      </div>
      <div className={styles.dayRight}>
        <div className={styles.dayRightCenter}>
          <span className={styles.restTime}>Do as many reps as you can</span>
        </div>
      </div>
    </Link>
  )
}
