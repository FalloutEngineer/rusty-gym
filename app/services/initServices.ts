import { db } from "@/app/firebase/config"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"

type InitUserDoc = (uid: string) => Promise<string>

type InitExercise = (
  uid: string,
  category: string,
  name: string
) => Promise<string>

export const initUserDoc: InitUserDoc = async (uid) => {
  try {
    const userDocRef = doc(db, "usersData", uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      const result = await setDoc(userDocRef, {
        Day: 0,
      })

      return "User record created successfully"
    }
    return "User record already exists"
  } catch (error) {
    return `${error}`
  }
}

export const initExercise: InitExercise = async (uid, category, name) => {
  try {
    const userDocRef = doc(db, "usersData", uid)
    const userDoc = await getDoc(userDocRef)

    if (userDoc.exists()) {
      const sportDocRef = doc(db, "usersData", uid, "Sport", category)
      const sportDoc = await getDoc(sportDocRef)
      if (!sportDoc.exists()) {
        const sport = await setDoc(sportDocRef, {})
      }

      const exerciseDocRef = doc(
        db,
        "usersData",
        uid,
        "Sport",
        category,
        "exercises",
        name
      )

      const result = await setDoc(exerciseDocRef, {
        currentDay: 0,
        maxRep: 0,
      })
      return "Exercise record created successfully"
    }

    return "Exercise record already exists"
  } catch (error) {
    return `${error}`
  }
}
