import React, { useEffect, useState } from "react"
import Image from "next/image"

import data from "../../../../data/trainings.json"

import styles from "./styles.module.css"
import TrainingMenuItem from "@/app/components/Training/TrainingMenuItem"

export default function Training() {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Image src={""} alt={""} />
        <h2 className={styles.heading}>Regular Push Ups</h2>
      </div>
      <nav className={styles.menu}>
        <ul className="menuList">
          <li className="menuItem">
            <TrainingMenuItem isActive={false} iconURL={undefined} />
          </li>
          <li className="menuItem">
            <TrainingMenuItem />
          </li>
          <li className="menuItem">
            <TrainingMenuItem />
          </li>
        </ul>
      </nav>
      <div className={styles.trainingContainer}>
        <h3 className={styles.subheading}>Workout plan</h3>
        <ul className={styles.daysList}>
          <li className={styles.dayItem}>
            <button className={styles.dayItemButtonWrapper}>
              <div className={styles.dayLeft}>
                <span>1</span> <span>Day</span>
              </div>
              <div className={styles.dayRight}>
                <ul className={styles.dayApproaches}>
                  <li className={styles.dayApproach}>10</li>
                  <li className={styles.dayApproach}>9</li>
                  <li className={styles.dayApproach}>8</li>
                  <li className={styles.dayApproach}>7</li>
                  <li className={styles.dayApproach}>6</li>
                </ul>
                <div className={styles.completion}>V</div>
              </div>
            </button>
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
