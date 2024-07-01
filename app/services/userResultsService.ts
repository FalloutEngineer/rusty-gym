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
} from "firebase/firestore"

export const fetchUserResults = async (uid: string) => {
  const q = query(collection(db, "usersMaxReps"), where("UID", "==", uid))

  const querySnapshot = await getDocs(q)

  const data = querySnapshot.docs.map((doc) => doc.data())

  const arrayOfMaxReps = Object.entries(data[0].MaxReps)

  return arrayOfMaxReps
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
export const updateUserResult = async (uid: string, updatedData: any) => {
  try {
    const q = query(collection(db, "usersMaxReps"), where("UID", "==", uid))
    const querySnapshot = await getDocs(q)

    // Проходимося по кожному документу, що відповідає умові
    querySnapshot.forEach(async (document) => {
      const userDocRef = doc(db, "usersMaxReps", document.id) // Посилання на кожен знайдений документ

      // Оновлюємо поле MaxReps у документі з новими даними
      await setDoc(userDocRef, { MaxReps: updatedData }, { merge: true })
    })

    console.log("Поле MaxReps оновлено успішно")
  } catch (error) {
    console.error("Помилка при оновленні поля MaxReps:", error)
    throw error // Обробте помилку відповідно до вашого використання
  }
}

// // Функція для видалення результату
// export const deleteUserResult = async (uid, resultId) => {
//   const resultDocRef = doc(db, "users", uid, "sportsResults", resultId)
//   await deleteDoc(resultDocRef)
// }
