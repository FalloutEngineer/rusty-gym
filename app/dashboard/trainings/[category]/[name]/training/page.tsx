"use client"
import React, { useEffect, useState } from "react"

import styles from "./styles.module.css"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  getAllTrainingsInCategory,
  getCategories,
} from "@/app/services/getTrainingsService"
import { fetchUserData, setNextDay } from "@/app/services/userResultsService"
import { UserAuth } from "@/app/context/AuthContext"
import { getArrayOfReps } from "@/app/services/repsService"

interface ITrainingProps {
  reps: number[]
  videoLink?: string
  restTime: number
}

export default function Training() {
  const restTime = 180

  const pathname = usePathname()
  const router = useRouter()

  const { user } = UserAuth()

  const training = pathname.split("/").reverse()[1]
  const category = pathname.split("/").reverse()[2]

  const [trainingObject, setTrainingObject] = useState<any>()

  const [userResult, setUserResult] = useState<any>()

  const [repsArray, setRepsArray] = useState<Array<Array<number>>>()

  const [currentReps, setCurrentReps] = useState(0)
  const [currentRep, setCurrentRep] = useState(0)

  const [timeLeft, setTimeLeft] = useState(0)
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
    if (repsArray && repsArray[0] && userResult) {
      if (currentRep + 1 < repsArray[userResult.data.currentDay - 1].length) {
        setCurrentRep(currentRep + 1)
        setCurrentReps(
          repsArray[userResult.data.currentDay - 1][currentRep + 1]
        )
        setIsTimerRunning(false)
        setTimeLeft(repsArray[userResult.data.currentDay - 1][currentRep + 1])
        startRest()
      }
      if (currentRep + 1 === repsArray[userResult.data.currentDay - 1].length) {
        setNextDay(userResult.data.currentDay, user.uid, category, training)

        if (pathname) {
          const newPathArrayTemp = pathname.split("/")
          newPathArrayTemp.pop()
          const newPathArray = newPathArrayTemp.join("/")

          router.push(newPathArray)
        }
      }
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

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRaw = await getCategories()
      const trainingsRaw = await getAllTrainingsInCategory(category)

      const categories = categoriesRaw.map((category) => {
        return category.id
      })

      const trainings = trainingsRaw.map((training) => {
        return training.id
      })

      if (categories.includes(category)) {
        if (training) {
          if (trainings.includes(training)) {
            const currentTrainingObject = trainingsRaw.find(
              (trainingObject) => trainingObject.id === training
            )

            if (currentTrainingObject) {
              console.log(currentTrainingObject)

              setTrainingObject(currentTrainingObject)
            } else {
              router.push("/404")
            }
          } else {
            router.push("/404")
          }
        } else {
          router.push("/404")
        }
      } else {
        router.push("/404")
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const userData = await fetchUserData(user.uid)

          if (userData) {
            const trainingObject = userData.Sport.find(
              (categoryObj) => categoryObj.id === category
            )

            if (trainingObject) {
              const userResult = trainingObject.exercises.find(
                (exerciseObj) => exerciseObj.id === training
              )

              setUserResult(userResult)
            } else {
              throw new Error("There is no record about exercise")
            }
          } else {
            throw new Error("Can't get user data")
          }
        }
      } catch (error) {
        alert(error)
      }
    }

    fetchData()
  }, [trainingObject])

  useEffect(() => {
    if (trainingObject && userResult) {
      const tempArrayOfReps = getArrayOfReps(
        userResult.data.maxRep,
        trainingObject.modifier,
        trainingObject.firstRepModifier,
        trainingObject.nextRepModifier
      )
      setRepsArray(tempArrayOfReps)
    }
  }, [trainingObject, userResult])

  useEffect(() => {
    if (repsArray) {
      setCurrentReps(repsArray[userResult.data.currentDay - 1][0])
      setTimeLeft(repsArray[userResult.data.currentDay - 1][0])
    }
  }, [repsArray])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {trainingObject && (
          <Link className={styles.videoLink} href={trainingObject.videoURL}>
            How to do it?
          </Link>
        )}
      </div>
      <h2 className={styles.heading}>Workout</h2>
      <div className={styles.body}>
        <div className={styles.upper}>
          {isRest ? (
            <div className={styles.restWrapper}>
              <h3 className={styles.restHeading}>Rest: </h3>
              <span className={styles.restNumber}>{currentRestTime}</span>
            </div>
          ) : trainingObject && trainingObject.isTimed ? (
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
            {repsArray &&
              repsArray[0] &&
              userResult &&
              repsArray[userResult.data.currentDay - 1].map((rep, index) => {
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
