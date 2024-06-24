"use client"
import React, { useEffect, useState } from "react"

import styles from "./styles.module.css"
import Link from "next/link"

interface ITrainingProps {
  reps: number[]
  videoLink?: string
  restTime: number
}

export default function Training({
  reps = [1337, 228, 69, 5, 1],
  videoLink = "https://www.youtube.com/watch?v=cvq7Jy-TFAU",
  restTime = 3,
}: ITrainingProps) {
  const [currentReps, setCurrentReps] = useState(reps[0])
  const [currentRep, setCurrentRep] = useState(0)

  const [isRest, setIsRest] = useState(false)
  const [currentRestTime, setCurrentRestTime] = useState(restTime)

  function increaseReps() {
    setCurrentReps(currentReps + 1)
  }

  function decreaseReps() {
    if (currentReps - 1 >= 0) {
      setCurrentReps(currentReps - 1)
    }
  }

  function repDone() {
    if (currentRep + 1 < reps.length) {
      setCurrentRep(currentRep + 1)
      setCurrentReps(reps[currentRep + 1])
      startRest()
    }
    if (currentRep + 1 === reps.length) {
      console.log("Done!")
    }
  }

  function startRest() {
    setIsRest(true)
  }

  function endRest() {
    setIsRest(false)
  }

  useEffect(() => {
    if (isRest) {
      const timer = setInterval(() => {
        setCurrentRestTime((currentRestTime) => {
          if (currentRestTime === 0) {
            clearInterval(timer)
            return 0
          } else {
            return currentRestTime - 1
          }
        })
      }, 1000)
    } else {
      setCurrentRestTime(restTime)
    }
  }, [isRest])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.videoLink} href={videoLink}>
          How to do it?
        </Link>
      </div>
      <h2 className={styles.heading}>Workout</h2>
      <div className={styles.body}>
        <div className={styles.upper}>
          {isRest ? (
            <div className={styles.restWrapper}>
              <h3 className={styles.restHeading}>Rest: </h3>
              <span className={styles.restNumber}>{currentRestTime}</span>
            </div>
          ) : (
            <>
              <button
                className={styles.repButton}
                onClick={() => decreaseReps()}
              >
                -
              </button>
              <span className={styles.currentRep}>{currentReps}</span>
              <button
                className={styles.repButton}
                onClick={() => increaseReps()}
              >
                +
              </button>
            </>
          )}
        </div>
        <div className={styles.lower}>
          {isRest ? (
            <button className={styles.done} onClick={() => endRest()}>
              Done
            </button>
          ) : (
            <button className={styles.done} onClick={() => repDone()}>
              Done
            </button>
          )}
          <ul className={styles.reps}>
            {reps.map((rep, index) => {
              return (
                <li
                  key={rep}
                  className={
                    styles.rep +
                    " " +
                    (index === currentRep ? styles.active : "")
                  }
                >
                  {rep}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
