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

export const fetchUserData = async (uid: string) => {
  try {
    const userCollectionRef = collection(db, "usersData")
    const userDocRef = doc(userCollectionRef, uid)
    const sportCollectionRef = collection(userDocRef, "Sport")

    const docSnapshot = await getDoc(userDocRef)

    if (docSnapshot.exists()) {
      const sportSnapshot = await getDocs(sportCollectionRef)

      const sportData = await Promise.all(
        sportSnapshot.docs.map(async (sportDoc) => {
          const sportId = sportDoc.id
          const sportInfo = sportDoc.data()

          const exercisesCollectionRef = collection(sportDoc.ref, "exercises")

          const exercisesSnapshot = await getDocs(exercisesCollectionRef)

          const exercisesData = exercisesSnapshot.docs.map((exerciseDoc) => {
            const exerciseId = exerciseDoc.id
            const exerciseInfo = exerciseDoc.data()

            return {
              id: exerciseId,
              data: exerciseInfo,
            }
          })

          return {
            id: sportId,
            data: sportInfo,
            exercises: exercisesData,
          }
        })
      )

      return { id: docSnapshot.id, data: docSnapshot.data(), Sport: sportData }
    } else {
      console.log("Документ не знайдено!")
      return null
    }
  } catch (error) {
    console.error("Помилка отримання колекції:", error)
    throw error
  }
}

export const updateExerciseData = async (
  uid: string,
  sportId: string,
  exerciseId: string,
  updatedData: Partial<any>
) => {
  try {
    const userDocRef = doc(db, "usersData", uid)
    const sportDocRef = doc(userDocRef, "Sport", sportId)
    const exerciseDocRef = doc(sportDocRef, "exercises", exerciseId)

    if (updatedData.currentDay) {
      if (typeof updatedData.currentDay === "number") {
        if (updatedData.currentDay >= 0 && updatedData.currentDay <= 3) {
          await updateDoc(exerciseDocRef, updatedData)

          console.log(`Дані про вправу з ID: ${exerciseId} успішно оновлено`)

          return
        }
      }
    } else {
      await updateDoc(exerciseDocRef, updatedData)

      console.log(`Дані про вправу з ID: ${exerciseId} успішно оновлено`)

      return
    }
    console.error(
      "Помилка при оновленні даних про вправу в Firestore:",
      "currentDay не є числом від 0 до 3"
    )
  } catch (error) {
    console.error("Помилка при оновленні даних про вправу в Firestore:", error)
  }
}

// export const updateUserDay = async (uid: string, newDay: number) => {
//   try {
//     if (newDay >= 0 && newDay <= 6) {
//       const userCollectionRef = collection(db, "usersData")
//       const userDocRef = doc(userCollectionRef, uid)

//       await updateDoc(userDocRef, { Day: newDay })

//       console.log("Day updated successfully")
//     } else {
//       console.log("Day must be in range from 0 to 6")
//       throw new Error("Day must be in range from 0 to 6")
//     }
//     console.log("Day updated successfully")
//   } catch (error) {
//     console.log("Error on updating day", error)

//     throw error // Обробте помилку відповідно до вашого використання
//   }
// }
