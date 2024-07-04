"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import data from "../../../../data/trainings.json"

import styles from "./styles.module.css"
import TrainingMenuItem from "@/app/components/Training/TrainingMenuItem"
import DayTraining from "@/app/components/Training/DayTraining"
import MeasurementDay from "@/app/components/Training/MeasurementDay"
import { usePathname, useRouter } from "next/navigation"
import {
  getAllTrainingsInCategory,
  getCategories,
} from "@/app/services/getTrainingsService"

export default function Training() {
  const pathname = usePathname()
  const router = useRouter()

  const training = pathname.split("/").pop()
  const category = pathname.split("/").reverse()[1]

  const [trainingObject, setTrainingObject] = useState<any>()

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
            />
          </li>
          <li className={styles.dayItem}>
            <DayTraining day={2} restTime={90} link={pathname + "/training"} />
          </li>
          <li className={styles.dayItem}>
            <DayTraining
              day={3}
              restTime={120}
              link={pathname + "/training"}
              isEnabled={false}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
