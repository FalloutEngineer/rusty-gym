"use client"
import React, { useEffect, useState } from "react"

import styles from "./styles.module.css"

import type { ProgramsObject } from "../../types.d.ts"

import { programsObject } from "../../programs"
import { TrainingLevels } from "../../enums"
import Link from "next/link"
import Image from "next/image"
import {
  getAllProgramsInCategory,
  getProgramCategories,
} from "@/app/services/getProgramsService"

export default function Programs() {
  const programs: ProgramsObject = programsObject

  const [categories, setCategories] = useState<Array<any>>()
  const [trainings, setTrainings] = useState<Array<any>>()

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getProgramCategories()

      if (categories) {
        setCategories(categories.reverse())
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (categories && categories.length > 0) {
        const trainings = categories.map(async (category) => {
          const allTrainings = await getAllProgramsInCategory(category.id)
          return {
            category: category.id,
            name: category.data.strings.EN.name,
            trainings: allTrainings,
          }
        })

        Promise.all(trainings).then((result) => {
          setTrainings(result)
        })
      }
    }
    fetchData()
  }, [categories])

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.heading}>Trainings</h2>
      </div>
      <ul className={styles.body}>
        {trainings &&
          trainings.map((section) => {
            return (
              <li key={section.id} className={styles.section}>
                <div className={styles.sectionHeadingWrapper}>
                  <h3 className={styles.sectionHeading}>{section.name}</h3>
                </div>
                <div className={styles.sectionBody}>
                  {section.trainings &&
                    section.trainings.map((program: any) => {
                      return (
                        <Link
                          href={
                            "./programs/" + section.category + "/" + program.id
                          }
                          key={program.id}
                          className={styles.program}
                        >
                          {program.imageURL ? (
                            <Image
                              className={styles.image}
                              src={program.imageURL}
                              alt={""}
                            ></Image>
                          ) : (
                            <div className={styles.imagePlaceholder}></div>
                          )}
                          <div className={styles.programLower}>
                            <h4 className={styles.programHeading}>
                              {program.strings.EN.name}
                            </h4>
                            <span
                              className={
                                styles.programLevel +
                                " " +
                                (program.level === TrainingLevels.BEGINNER
                                  ? styles.beginner
                                  : program.level ===
                                    TrainingLevels.INTERMEDIATE
                                  ? styles.intermediate
                                  : styles.advanced)
                              }
                            >
                              {program.level}
                            </span>
                          </div>

                          <figure
                            className={
                              styles.levelFig +
                              " " +
                              (program.level === TrainingLevels.BEGINNER
                                ? styles.beginner
                                : program.level === TrainingLevels.INTERMEDIATE
                                ? styles.intermediate
                                : styles.advanced)
                            }
                          ></figure>
                        </Link>
                      )
                    })}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
