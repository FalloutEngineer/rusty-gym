import type { ProgramsObject } from "./types"

import { TrainingLevels } from "./enums"

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
          trainings: [
            { categoryUrl: "pushUps", url: "knee" },
            { categoryUrl: "pushUps", url: "wide" },
          ],
        },
        {
          name: "At home",
          level: TrainingLevels.INTERMEDIATE,
          id: "atHomeLossIntermediate",
          trainings: [
            { categoryUrl: "pushUps", url: "wide" },
            { categoryUrl: "pushUps", url: "regular" },
          ],
        },
        {
          name: "At home",
          level: TrainingLevels.ADVANCED,
          id: "atHomeLossAdvanced",
          trainings: [
            { categoryUrl: "pushUps", url: "regular" },
            { categoryUrl: "pushUps", url: "diamond" },
          ],
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
          trainings: [
            { categoryUrl: "pushUps", url: "knee" },
            { categoryUrl: "pushUps", url: "wide" },
          ],
        },
        {
          name: "At home",
          level: TrainingLevels.INTERMEDIATE,
          id: "atHomeGainUpperIntermediate",
          trainings: [
            { categoryUrl: "pushUps", url: "wide" },
            { categoryUrl: "pushUps", url: "regular" },
          ],
        },
        {
          name: "At home",
          level: TrainingLevels.ADVANCED,
          id: "atHomeGainUpperAdvanced",
          trainings: [
            { categoryUrl: "pushUps", url: "regular" },
            { categoryUrl: "pushUps", url: "diamond" },
          ],
        },
        {
          name: "Outdoors",
          level: TrainingLevels.BEGINNER,
          id: "outdoorsGainUpperBeginner",
          trainings: [
            { categoryUrl: "pushUps", url: "wide" },
            { categoryUrl: "pullUps", url: "chin" },
          ],
        },
        {
          name: "Outdoors",
          level: TrainingLevels.INTERMEDIATE,
          id: "outdoorsGainUpperIntermediate",
          trainings: [
            { categoryUrl: "pushUps", url: "regular" },
            { categoryUrl: "pullUps", url: "chin" },
          ],
        },
        {
          name: "Outdoors",
          level: TrainingLevels.ADVANCED,
          id: "outdoorsGainUpperAdvanced",
          trainings: [
            { categoryUrl: "pushUps", url: "diamond" },
            { categoryUrl: "pullUps", url: "regular" },
          ],
        },
      ],
    },
  ],
}
