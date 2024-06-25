"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import styles from "./styles.module.css"
import Link from "next/link"

interface IMeasurmentProps {
  reps: number
  isTimed?: boolean
  videoLink?: string
}

export default function MeasurementDayPage({
  reps = 10,
  isTimed = true,
  videoLink = "https://www.youtube.com/watch?v=cvq7Jy-TFAU",
}: IMeasurmentProps) {
  const [currentReps, setCurrentReps] = useState(reps)
  const [currentRep, setCurrentRep] = useState(0)

  const [timeLeft, setTimeLeft] = useState(reps)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  function increaseReps() {
    setCurrentReps(currentReps + 1)
  }

  function decreaseReps() {
    if (currentReps - 1 >= 0) {
      setCurrentReps(currentReps - 1)
    }
  }

  function repDone() {
    console.log("Done!")
  }

  function startTimer() {
    setIsTimerRunning(true)
  }

  function pauseTimer() {
    setIsTimerRunning(false)
  }

  useEffect(() => {
    let timer: any
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft === 0) {
            clearInterval(timer)
            timer = false
            return 0
          } else {
            return timeLeft - 1
          }
        })
      }, 1000)
    } else {
      if (timer) {
        clearInterval(timer)
        timer = false
      }
    }

    return () => clearInterval(timer)
  }, [isTimerRunning])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link className={styles.videoLink} href={videoLink}>
          How to do it?
        </Link>
      </div>
      <h2 className={styles.heading}>Measurement Day</h2>
      <div className={styles.body}>
        <div className={styles.upper}>
          {isTimed ? (
            <div className={styles.timedWrapper}>
              <h3>Time left:</h3>
              <span className={styles.currentRep}>{timeLeft}</span>
              {isTimerRunning ? (
                <button
                  className={styles.timerButton}
                  onClick={() => pauseTimer()}
                >
                  Pause
                </button>
              ) : (
                <button
                  className={styles.timerButton}
                  onClick={() => startTimer()}
                >
                  Start
                </button>
              )}
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
          <button className={styles.done} onClick={() => repDone()}>
            Done
          </button>
          <div className="placeholder"></div>
        </div>
      </div>
    </div>
  )
}
