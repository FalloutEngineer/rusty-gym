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

// export const getSingleTraining = async (category: string, training: string) => {
//   try {

//     const trainingRef = doc(db, "exercises", category, "exercises", training)
//     const docSnap = await getDoc(trainingRef)

//     if (docSnap.exists()) {
//       const trainingData = docSnap.data()
//       return {
//         id: docSnap.id,
//         ...trainingData,
//       }
//     } else {
//       throw new Error(
//         `Training with ID "${training}" not found in category "${category}"`
//       )
//     }
//   } catch (error) {
//     console.error("Error fetching training:", error)
//     throw error // rethrow the error for handling elsewhere if needed
//   }
// }

export const getSingleTraining = async (category: string, name: string) => {
  const q = collection(db, "exercises", category, "exercises")
  const querySnapshot = await getDocs(q)

  const trainingDoc = querySnapshot.docs.find((doc) => {
    return doc.id === name
  })

  if (!trainingDoc) {
    throw new Error(
      `Training program with name "${name}" not found in category "${category}"`
    )
  }

  const data = trainingDoc.data()
  return {
    id: trainingDoc.id,
    ...data,
  }
}
