"use client"
import { UserAuth } from "@/app/context/AuthContext"
import { auth, db, doc, getDoc } from "@/app/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"

export default function Profile() {
  const [userRepsArray, setUserRepsArray]: any = useState(null)

  const { user } = UserAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid

        const q = query(collection(db, "usersMaxReps"), where("UID", "==", uid))

        const querySnapshot = await getDocs(q)

        const data = querySnapshot.docs.map((doc) => doc.data())

        const arrayOfMaxReps = Object.entries(data[0].MaxReps)

        console.log(arrayOfMaxReps)

        setUserRepsArray(arrayOfMaxReps)
      }
    }

    fetchData()
  }, [user])

  return (
    <div className="wrapper">
      <h2>Personal Results: </h2>
      <ul>
        {userRepsArray
          ? userRepsArray.map((sport: any) => {
              return (
                <li key={sport[0]}>
                  <h3>{sport[0]}</h3>
                  <ul>
                    {Object.entries(sport[1]).map((sportSubtype: any) => {
                      console.log(sportSubtype[0])

                      return (
                        <li key={sportSubtype[0]}>
                          {sportSubtype[0]}: {sportSubtype[1]}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })
          : "Loading..."}
      </ul>
    </div>
  )
}

// const arrayOfMaxReps = Object.entries(item.MaxReps)

//             console.log(arrayOfMaxReps)

//             return (
//               <li key={index}>
//                 <ul>
//                   {arrayOfMaxReps.map((sport: any) => {
//                     return <li key={sport[0]}>{sport[0]}</li>
//                   })}
//                 </ul>
//               </li>
