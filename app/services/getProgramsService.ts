import { db } from "@/app/firebase/config"

import { collection, getDocs } from "firebase/firestore"

export const getProgramCategories = async () => {
  const trainingsCollectionRef = collection(db, "trainings")
  const trainingsSnapshot = await getDocs(trainingsCollectionRef)

  const categoriesData = trainingsSnapshot.docs.map((exDoc) => ({
    id: exDoc.id,
    data: exDoc.data(),
  }))

  return categoriesData
}

export const getAllProgramsInCategory = async (category: string) => {
  const q = collection(db, "trainings", category, "trainings")
  const querySnapshot = await getDocs(q)
  const trainings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return trainings
}
