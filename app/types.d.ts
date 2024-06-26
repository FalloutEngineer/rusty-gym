import { TrainingLevels } from "./enums"

export type SignupInputs = {
  email: string
  password: string
}

export type ProgramObject = {
  name: string
  imageURL?: string
  level: TrainingLevels
  id: string
}

export type ProgramsSectionObject = {
  name: string
  id: string
  programs: TrainingObject[]
}

export type ProgramsObject = {
  sections: ProgramsSectionObject[]
}
