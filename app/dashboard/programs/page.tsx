import React from "react"

import styles from "./styles.module.css"

import type { ProgramsObject } from "../../types.d.ts"

import { programsObject } from "../../programs"
import { TrainingLevels } from "../../enums"
import Link from "next/link"
import Image from "next/image"

export default function Programs() {
  const programs: ProgramsObject = programsObject

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.heading}>Trainings</h2>
      </div>
      <ul className={styles.body}>
        {programs.sections.map((section) => {
          return (
            <li key={section.id} className={styles.section}>
              <div className={styles.sectionHeadingWrapper}>
                <h3 className={styles.sectionHeading}>{section.name}</h3>
              </div>
              <div className={styles.sectionBody}>
                {section.programs.map((program) => {
                  return (
                    <Link
                      href={"./programs/" + program.id}
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
                          {program.name}
                        </h4>
                        <span
                          className={
                            styles.programLevel +
                            " " +
                            (program.level === TrainingLevels.BEGINNER
                              ? styles.beginner
                              : program.level === TrainingLevels.INTERMEDIATE
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
