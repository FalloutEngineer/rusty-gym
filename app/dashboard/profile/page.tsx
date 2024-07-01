"use client"
import { UserAuth } from "@/app/context/AuthContext"
import { db } from "@/app/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import Image from "next/image"

import styles from "./styles.module.css"
import Loader from "@/app/components/Util/Loader"
import Unauthorized from "@/app/components/Util/Unauthorized"

export default function Profile() {
  const [userRepsArray, setUserRepsArray]: any = useState(null)

  const { user } = UserAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log(user)

        const uid = user.uid

        const q = query(collection(db, "usersMaxReps"), where("UID", "==", uid))

        const querySnapshot = await getDocs(q)

        const data = querySnapshot.docs.map((doc) => doc.data())

        const arrayOfMaxReps = Object.entries(data[0].MaxReps)

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
