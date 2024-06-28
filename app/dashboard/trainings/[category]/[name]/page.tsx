"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import data from "../../../../data/trainings.json"

import styles from "./styles.module.css"
import TrainingMenuItem from "@/app/components/Training/TrainingMenuItem"
import DayTraining from "@/app/components/Training/DayTraining"
import MeasurementDay from "@/app/components/Training/MeasurementDay"
import { usePathname } from "next/navigation"

export default function Training() {
  const pathname = usePathname()

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
          <li className={styles.dayItem}>
            <MeasurementDay link={pathname + "/measurement"} isEnabled={true} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const paths: { params: { category: string; name: string } }[] = []

  data.trainings.forEach((category) => {
    category.trainings.forEach((training) => {
      paths.push({
        params: {
          category: category.categoryUrl,
          name: training.url,
        },
      })
    })
  })

  return {
    paths: paths,
    fallback: false,
  }
}
