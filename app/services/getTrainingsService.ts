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

export const getAllTrainingsInCategory = (category: string) => {}

export const getSingleTraining = (category: string, name: string) => {}
