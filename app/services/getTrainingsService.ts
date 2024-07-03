import { db } from "@/app/firebase/config"
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore"

export const getCategories = async () => {
  const exercisesCollectionRef = collection(db, "exercises")
  const exercisesSnapshot = await getDocs(exercisesCollectionRef)

  const exercisesData = exercisesSnapshot.docs.map((exDoc) => ({
    id: exDoc.id,
    imageURL: exDoc.data().imageURL,
  }))

  return exercisesData
}

export const getAllTrainingsInCategory = async (category: string) => {
  const q = collection(db, "exercises", category, "exercises")
  const querySnapshot = await getDocs(q)
  const exercises = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return exercises
}

export const getSingleTraining = (category: string, name: string) => {}
