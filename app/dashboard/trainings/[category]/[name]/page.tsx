"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import data from "../../../../data/trainings.json"

import styles from "./styles.module.css"
import TrainingMenuItem from "@/app/components/Training/TrainingMenuItem"
import DayTraining from "@/app/components/Training/DayTraining"
import MeasurementDay from "@/app/components/Training/MeasurementDay"

export default function Training() {
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
              onClick={() =>
                console.error("Day Training function not implemented")
              }
              day={1}
            />
          </li>
          <li className={styles.dayItem}>
            <DayTraining
              onClick={() =>
                console.error("Day Training function not implemented")
              }
              day={2}
              restTime={90}
            />
          </li>
          <li className={styles.dayItem}>
            <DayTraining
              onClick={() =>
                console.error("Day Training function not implemented")
              }
              day={3}
              restTime={120}
            />
          </li>
          <li className={styles.dayItem}>
            <MeasurementDay
              onClick={() =>
                console.error("Measurement Day function not implemented")
              }
            />
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

// export async function getStaticProps({ params }) {}
