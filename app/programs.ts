import type { ProgramsObject } from "./types"

import { TrainingLevels } from "./enums.ts"

export const programsObject: ProgramsObject = {
  sections: [
    {
      name: "Weight loss",
      id: "weightLoss",
      programs: [
        {
          name: "At home",
          level: TrainingLevels.BEGINNER,
          id: "atHomeLossBeginner",
        },
        {
          name: "At home",
          level: TrainingLevels.INTERMEDIATE,
          id: "atHomeLossIntermediate",
        },
        {
          name: "At home",
          level: TrainingLevels.ADVANCED,
          id: "atHomeLossAdvanced",
        },
      ],
    },
    {
      name: "Upper body muscle gain",
      id: "upperBodyGain",
      programs: [
        {
          name: "At home",
          level: TrainingLevels.BEGINNER,
          id: "atHomeGainUpperBeginner",
        },
        {
          name: "At home",
          level: TrainingLevels.INTERMEDIATE,
          id: "atHomeGainUpperIntermediate",
        },
        {
          name: "At home",
          level: TrainingLevels.ADVANCED,
          id: "atHomeGainUpperAdvanced",
        },
        {
          name: "Outdoors",
          level: TrainingLevels.BEGINNER,
          id: "outdoorsGainUpperBeginner",
        },
        {
          name: "Outdoors",
          level: TrainingLevels.INTERMEDIATE,
          id: "outdoorsGainUpperIntermediate",
        },
        {
          name: "Outdoors",
          level: TrainingLevels.ADVANCED,
          id: "outdoorsGainUpperAdvanced",
        },
      ],
    },
  ],
}
