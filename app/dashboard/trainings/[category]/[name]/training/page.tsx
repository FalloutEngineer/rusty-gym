"use client"
import React, { useEffect, useState } from "react"

import styles from "./styles.module.css"
import Link from "next/link"

interface ITrainingProps {
  reps: number[]
  isTimed?: boolean
  videoLink?: string
  restTime: number
}

export default function Training() {
  const reps = [1337, 228, 69, 5, 1]
  const isTimed = true
  const videoLink = "https://www.youtube.com/watch?v=cvq7Jy-TFAU"
  const restTime = 3

  const [currentReps, setCurrentReps] = useState(reps[0])
  const [currentRep, setCurrentRep] = useState(0)

  const [timeLeft, setTimeLeft] = useState(reps[0])
  const [isTimerRunning, setIsTimerRunning] = useState(false)

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
      setIsTimerRunning(false)
      setTimeLeft(reps[currentRep + 1])
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

  function startTimer() {
    setIsTimerRunning(true)
  }

  function pauseTimer() {
    setIsTimerRunning(false)
  }

  useEffect(() => {
    let timer: any
    if (isRest) {
      timer = setInterval(() => {
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

    return () => clearInterval(timer)
  }, [isRest])

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
      <h2 className={styles.heading}>Workout</h2>
      <div className={styles.body}>
        <div className={styles.upper}>
          {isRest ? (
            <div className={styles.restWrapper}>
              <h3 className={styles.restHeading}>Rest: </h3>
              <span className={styles.restNumber}>{currentRestTime}</span>
            </div>
          ) : isTimed ? (
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
