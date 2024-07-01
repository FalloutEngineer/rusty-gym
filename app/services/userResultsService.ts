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

// Функція для додавання нового результату
// export const addUserResult = async (uid: string, sport: string, resultData: number) => {
//   const sportsResultsCollectionRef = collection(
//     doc(db, "users", uid),
//     "sportsResults"
//   )
//   await setDoc(doc(sportsResultsCollectionRef), {
//     sport,
//     ...resultData,
//   })
// }

// Функція для оновлення існуючого результату
// export const updateUserResult = async (uid: string, updatedData: any) => {
//   try {
//     const q = query(collection(db, "usersMaxReps"), where("UID", "==", uid))
//     const querySnapshot = await getDocs(q)

//     // Проходимося по кожному документу, що відповідає умові
//     querySnapshot.forEach(async (document) => {
//       const userDocRef = doc(db, "usersMaxReps", document.id) // Посилання на кожен знайдений документ

//       // Оновлюємо поле MaxReps у документі з новими даними
//       await setDoc(userDocRef, { MaxReps: updatedData }, { merge: true })
//     })

//     console.log("Поле MaxReps оновлено успішно")
//   } catch (error) {
//     console.error("Помилка при оновленні поля MaxReps:", error)
//     throw error // Обробте помилку відповідно до вашого використання
//   }
// }

// // Функція для видалення результату
// export const deleteUserResult = async (uid, resultId) => {
//   const resultDocRef = doc(db, "users", uid, "sportsResults", resultId)
//   await deleteDoc(resultDocRef)
// }
