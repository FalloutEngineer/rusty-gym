import { db } from "@/app/firebase/config"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"

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
    return "User record created successfully"
  } catch (error) {
    return `${error}`
  }
}
