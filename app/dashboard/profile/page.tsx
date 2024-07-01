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
  fetchUserResults,
  updateUserResult,
} from "@/app/services/userResultsService"

export default function Profile() {
  const [userRepsArray, setUserRepsArray]: any = useState(null)

  const [isEditRepsMode, setIsEditRepsMode] = useState(false)

  const [repsValues, setRepsValues] = useState({
    PullUps: {
      Chin: 0,
      Regular: 0,
    },
    PushUps: {
      Knee: 0,
      Regular: 0,
      Wide: 0,
      Diamond: 0,
    },
  })

  const { user } = UserAuth()

  function enableEditRepsMode() {
    setIsEditRepsMode(true)
  }

  function disableEditRepsMode() {
    setIsEditRepsMode(false)
  }

  function saveEditedReps() {
    if (user) {
      alert("Test function triggered!")
      setRepsValues({
        PullUps: {
          Chin: 5,
          Regular: 5,
        },
        PushUps: {
          Knee: 5,
          Regular: 5,
          Wide: 5,
          Diamond: 5,
        },
      })

      const uid = user.uid

      updateUserResult(uid, repsValues)

      disableEditRepsMode()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid

        const arrayOfMaxReps = await fetchUserResults(uid)

        setUserRepsArray(arrayOfMaxReps)
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
                              {Object.entries(sport[1]).map(
                                (sportSubtype: any) => {
                                  return (
                                    <li
                                      key={sportSubtype[0]}
                                      className={styles.resultItem}
                                    >
                                      {sportSubtype[0]}: {sportSubtype[1]}
                                    </li>
                                  )
                                }
                              )}
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
                  isEditMode={isEditRepsMode}
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
