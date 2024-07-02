"use client"
import { UserAuth } from "@/app/context/AuthContext"
import { db } from "@/app/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import styles from "./styles.module.css"
import Loader from "@/app/components/Util/Loader"
import Unauthorized from "@/app/components/Util/Unauthorized"
import EditControls from "@/app/components/Dashboard/Profile/EditControls"
import {
  fetchUserData,
  updateExerciseData,
} from "@/app/services/userResultsService"
import SportItem from "@/app/components/Dashboard/Profile/SportItem"

type ExercisesToUpdateDataType = {
  maxRep: number
  currentDay: number
}

type ExercisesToUpdateType = {
  sport: string
  exercise: string
  data: Partial<ExercisesToUpdateDataType>
}

export default function Profile() {
  const [userRepsArray, setUserRepsArray]: any = useState(null)

  const [isEditTrainingsMode, setisEditTrainingsMode] = useState(false)

  const [exercisesToUpdate, setExercisesToUpdate] = useState<
    ExercisesToUpdateType[]
  >([])

  const { user } = UserAuth()

  function enableEditRepsMode() {
    setisEditTrainingsMode(true)
  }

  function disableEditRepsMode() {
    setisEditTrainingsMode(false)
  }

  function saveEditedReps() {
    if (user) {
      exercisesToUpdate.forEach((exercise) => {
        updateExerciseData(
          user.uid,
          exercise.sport,
          exercise.exercise,
          exercise.data
        )
      })

      disableEditRepsMode()
    }
  }

  function addOrUpdateExerciseToUpdate(
    sport: string,
    exercise: string,
    newVal: any
  ) {
    let index: number

    index = exercisesToUpdate.findIndex((el) => {
      return (
        el.sport === sport && el.exercise === exercise && el.data === newVal
      )
    })

    if (index < 0) {
      setExercisesToUpdate([
        ...exercisesToUpdate,
        { sport: sport, exercise: exercise, data: newVal },
      ])
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid

        const userData = await fetchUserData(uid)

        let sportsArray: (string | any[])[][] = []

        if (userData && userData.Sport) {
          userData.Sport.forEach((sport) => {
            let temp: any[] = []

            if (sport.exercises) {
              sport.exercises.forEach((exercise) => {
                temp.push(exercise)
              })
            }

            sportsArray.push([sport.id, temp])
          })
        }
        setUserRepsArray(sportsArray)
      }
    }

    fetchData()
  }, [user])

  return (
    <>
      {user ? (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Profile</h2>
          </div>
          <div className={styles.body}>
            <section className={styles.section}>
              <div className={styles.sectionHeadingWrapper}>
                <h3 className={styles.sectionHeading}>General information: </h3>
              </div>
              <div className={styles.sectionBody}>
                <div className={styles.pfpWrapper}>
                  <Image src={user.photoURL} alt={""} fill={true} />
                </div>
                <p className={styles.nameWrapper}>Name: {user.displayName}</p>
                <p className={styles.uidWrapper}>UID: {user.uid}</p>
              </div>
            </section>
            <section className={styles.section}>
              <div className={styles.sectionHeadingWrapper}>
                <h3 className={styles.sectionHeading}>Personal results: </h3>
              </div>
              <div className={styles.sectionBody}>
                <ul className={styles.resultsList}>
                  {userRepsArray ? (
                    userRepsArray.map((sport: any) => {
                      return (
                        <li key={sport[0]} className={styles.resultSection}>
                          <h3>{sport[0]}</h3>
                          <div className={styles.resultListWrapper}>
                            <ul className={styles.resultList}>
                              {sport[1].map((sportSubtype: any) => {
                                return (
                                  <SportItem
                                    key={sportSubtype.id}
                                    sportSubtype={sportSubtype}
                                    isEditMode={isEditTrainingsMode}
                                    updateMaxRepsFunc={(newVal) => {
                                      addOrUpdateExerciseToUpdate(
                                        sport[0],
                                        sportSubtype.id,
                                        { maxRep: newVal }
                                      )
                                    }}
                                    updateDayFunc={(newVal) => {
                                      addOrUpdateExerciseToUpdate(
                                        sport[0],
                                        sportSubtype.id,
                                        { currentDay: newVal }
                                      )
                                    }}
                                  />
                                )
                              })}
                            </ul>
                          </div>
                        </li>
                      )
                    })
                  ) : (
                    <Loader />
                  )}
                </ul>
                <EditControls
                  isEditMode={isEditTrainingsMode}
                  enableEditModeFunc={enableEditRepsMode}
                  disableEditModeFunc={disableEditRepsMode}
                  saveResults={saveEditedReps}
                />
              </div>
            </section>
            <section className={styles.section}>
              <div className={styles.sectionHeadingWrapper}>
                <h3 className={styles.sectionHeading}>Friends: </h3>
              </div>
              <div className={styles.sectionBody}>
                <span>In Development...</span>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  )
}
