import { TrainingLevels } from "./enums"

export type SignupInputs = {
  email: string
  password: string
}

export type TrainingObject = {
  categoryUrl: string
  url: string
  name: string
  startingModifier: number
  approachModifier: number
  dayModifier: number
  imageURL?: string
}

export type TrainingPath = {
  categoryUrl: string
  url: string
}

export type ProgramObject = {
  name: string
  imageURL?: string
  level: TrainingLevels
  id: string
  trainings: TrainingPath[]
}

export type ProgramsSectionObject = {
  name: string
  id: string
  programs: ProgramObject[]
}

export type ProgramsObject = {
  sections: ProgramsSectionObject[]
}
