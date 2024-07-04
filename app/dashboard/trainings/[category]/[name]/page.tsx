"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import styles from "./styles.module.css"
import TrainingMenuItem from "@/app/components/Training/TrainingMenuItem"
import DayTraining from "@/app/components/Training/DayTraining"
import MeasurementDay from "@/app/components/Training/MeasurementDay"
import { usePathname, useRouter } from "next/navigation"
import {
  getAllTrainingsInCategory,
  getCategories,
} from "@/app/services/getTrainingsService"
import { fetchUserData } from "@/app/services/userResultsService"
import { UserAuth } from "@/app/context/AuthContext"

type ArrayOfRepsFunctionType = (
  maxRep: number,
  modifier: number,
  firstRepModifier: number,
  nextRepModifier: number
) => number[][]

export default function Training() {
  const pathname = usePathname()
  const router = useRouter()

  const { user } = UserAuth()

  const training = pathname.split("/").pop()
  const category = pathname.split("/").reverse()[1]

  const [trainingObject, setTrainingObject] = useState<any>()

  const [userResult, setUserResult] = useState<any>()

  const [repsArray, setRepsArray] = useState<Array<Array<number>>>()

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

  const getArrayOfReps: ArrayOfRepsFunctionType = (
    maxRep,
    modifier,
    firstRepModifier,
    nextRepModifier
  ) => {
    const firstRep = maxRep * firstRepModifier

    const tempResult = []

    const firstDay = fillRepsArray(firstRep, nextRepModifier)

    tempResult.push(firstDay)

    for (let i = 1; i < 3; i++) {
      const firstRep = tempResult[i - 1][0] * modifier
      const temp = fillRepsArray(firstRep, nextRepModifier)

      tempResult.push(temp)
    }

    const result = tempResult.map((repsArray) =>
      repsArray.map((rep) => Math.floor(rep))
    )

    return result
  }

  function fillRepsArray(firstRep: number, nextRepModifier: number) {
    let temp = firstRep

    const result = [firstRep]

    for (let i = 1; i < 5; i++) {
      temp = temp * nextRepModifier
      result.push(temp)
    }

    return result
  }

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Image src={""} alt={""} />
        <h2 className={styles.heading}>Regular Push Ups</h2>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <TrainingMenuItem isActive={true} iconURL={undefined} />
          </li>
          <li className={styles.menuItem}>
            <TrainingMenuItem isActive={false} iconURL={undefined} />
          </li>
          <li className={styles.menuItem}>
            <TrainingMenuItem isActive={false} iconURL={undefined} />
          </li>
        </ul>
      </nav>
      <div className={styles.trainingContainer}>
        <h3 className={styles.subheading}>Workout plan</h3>
        {repsArray && (
          <ul className={styles.daysList}>
            <li className={styles.dayItem}>
              <MeasurementDay
                link={pathname + "/measurement"}
                isEnabled={false}
              />
            </li>
            <li className={styles.dayItem}>
              <DayTraining
                day={1}
                link={pathname + "/training"}
                isComplete={true}
                reps={repsArray[0]}
              />
            </li>
            <li className={styles.dayItem}>
              <DayTraining
                day={2}
                restTime={90}
                link={pathname + "/training"}
                reps={repsArray[1]}
              />
            </li>
            <li className={styles.dayItem}>
              <DayTraining
                day={3}
                restTime={120}
                link={pathname + "/training"}
                isEnabled={false}
                reps={repsArray[2]}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
