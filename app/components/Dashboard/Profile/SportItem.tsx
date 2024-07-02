import { capitalizeFirstLetter } from "@/app/util/stringFunctions"
import React, { useState } from "react"

import styles from "./sportItem.module.css"

type SportItemProps = {
  sportSubtype: any
  isEditMode: boolean
  updateMaxRepsFunc: (newVal: number) => void
  updateDayFunc: (newVal: number) => void
}

export default function SportItem({
  sportSubtype,
  isEditMode,
  updateMaxRepsFunc,
  updateDayFunc,
}: SportItemProps) {
  const [localMaxReps, setLocalMaxReps] = useState(sportSubtype.data.maxRep)
  const [localCurrentDay, setLocalCurrentDay] = useState(
    sportSubtype.data.currentDay
  )

  function onRepsChange(e: any) {
    let newVal = Number(e.target.value)
    if (e.target.value < 0) {
      newVal = 0
    }

    setLocalMaxReps(newVal)

    updateMaxRepsFunc(newVal)
  }

  function onDayChange(e: any) {
    let newVal = Number(e.target.value)
    if (e.target.value < 0) {
      newVal = 0
    }
    if (e.target.value > 3) {
      newVal = 3
    }

    setLocalCurrentDay(newVal)

    updateDayFunc(newVal)
  }

  return (
    <li className={styles.resultItem}>
      <h4 className={styles.subtypeHeading}>
        {capitalizeFirstLetter(sportSubtype.id)}:
      </h4>

      <div className={styles.maxRep}>
        Max Reps:{" "}
        {isEditMode ? (
          <input
            onChange={(e) => onRepsChange(e)}
            type="number"
            min={0}
            defaultValue={localMaxReps}
            className={styles.input}
          />
        ) : (
          localMaxReps
        )}
      </div>
      <div className={styles.day}>
        Day:{" "}
        {isEditMode ? (
          <input
            onChange={(e) => onDayChange(e)}
            type="number"
            max={3}
            min={0}
            defaultValue={localCurrentDay}
            className={styles.input}
          />
        ) : (
          localCurrentDay
        )}
      </div>
    </li>
  )
}
