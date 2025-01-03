import { db } from "@/app/firebase/config"

import { collection, getDocs } from "firebase/firestore"

type Level = "Beginner" | "Intermediate" | "Advanced"

const levelOrder: { [key in Level]: number } = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
}

interface Training {
  category: string
  name: string
}

interface Strings {
  EN: {
    name: string
  }
  UA: {
    name: string
  }
}

interface TrainingProgram {
  id: string
  trainings: Training[]
  strings: Strings
  level: Level
}

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

  const trainings: TrainingProgram[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<TrainingProgram, "id">
    return {
      id: doc.id,
      ...data,
    }
  })

  trainings.sort((a, b) => {
    if (a.strings.EN.name < b.strings.EN.name) {
      return -1
    }
    if (a.strings.EN.name > b.strings.EN.name) {
      return 1
    }

    return levelOrder[a.level] - levelOrder[b.level]
  })

  return trainings
}

export const getProgramByCategoryAndName = async (
  category: string,
  name: string
) => {
  const q = collection(db, "trainings", category, "trainings")
  const querySnapshot = await getDocs(q)

  const trainingDoc = querySnapshot.docs.find((doc) => {
    return doc.id === name
  })

  if (!trainingDoc) {
    throw new Error(
      `Training program with name "${name}" not found in category "${category}"`
    )
  }

  const data = trainingDoc.data() as Omit<TrainingProgram, "id">
  return {
    id: trainingDoc.id,
    ...data,
  }
}
