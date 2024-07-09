"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import styles from "./styles.module.css"
import Link from "next/link"
import {
  fetchUserData,
  setNextDay,
  updateExerciseData,
} from "@/app/services/userResultsService"
import { usePathname, useRouter } from "next/navigation"
import { UserAuth } from "@/app/context/AuthContext"
import {
  getAllTrainingsInCategory,
  getCategories,
} from "@/app/services/getTrainingsService"

export default function MeasurementDayPage() {
  const isTimed = false
  const videoLink = "https://www.youtube.com/watch?v=cvq7Jy-TFAU"

  const pathname = usePathname()
  const router = useRouter()

  const { user } = UserAuth()

  const training = pathname.split("/").reverse()[1]
  const category = pathname.split("/").reverse()[2]

  const [trainingObject, setTrainingObject] = useState<any>()

  const [userResult, setUserResult] = useState<any>()

  const [currentReps, setCurrentReps] = useState(0)

  const [timeLeft, setTimeLeft] = useState(0)
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
    setNextDay(userResult.data.currentDay, user.uid, category, training)

    if (trainingObject.isTimed) {
      setCurrentReps(timeLeft)
    }

    updateExerciseData(user.uid, category, training, {
      maxRep: currentReps,
    })

    if (pathname) {
      const newPathArrayTemp = pathname.split("/")
      newPathArrayTemp.pop()
      const newPathArray = newPathArrayTemp.join("/")

      router.push(newPathArray)
    }
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
          return timeLeft + 1
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

              setCurrentReps(userResult?.data.maxRep)
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
