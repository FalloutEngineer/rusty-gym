"use client"
import React, { useEffect, useState } from "react"

import styles from "./styles.module.css"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getProgramByCategoryAndName } from "@/app/services/getProgramsService"
import { getSingleTraining } from "@/app/services/getTrainingsService"
import { log } from "console"

export default function Program() {
  const pathname = usePathname()

  const [program, setProgram] = useState<any>(null)
  const [trainings, setTrainings] = useState<any>(null)
  const [isTrainingsDone, setTrainingsDone] = useState<boolean>(false)

  let pathArray = pathname.split("/")

  const programName = pathArray.pop()

  const categoryName = pathArray.reverse()[0]

  useEffect(() => {
    const fetchData = async () => {
      if (programName) {
        const data = await getProgramByCategoryAndName(
          categoryName,
          programName
        )
        setProgram(data)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (program) {
        try {
          const result: any = []
          program.trainings.forEach(async (training: any, index: any) => {
            const res = await getSingleTraining(
              training.category,
              training.name
            )
            result.push(res)
            if (index + 1 === program.trainings.length) {
              setTrainings(result)
              setTrainingsDone(true)
            }
          })
        } catch (e) {
          console.error(e)
          alert(e)
        }
      }
    }

    fetchData()
  }, [program])

  useEffect(() => {
    if (trainings) {
      console.log(trainings)
    }
  }, [trainings])

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        {program &&
          program.imageURL !== null &&
          program.imageURL !== undefined && (
            <Image src={program.imageURL} alt={""} />
          )}
        <h2 className={styles.heading}>{program && program.strings.EN.name}</h2>
      </div>

      <div className={styles.trainings}>
        {program &&
          trainings &&
          program.trainings &&
          isTrainingsDone &&
          program.trainings.map((training: any, index: any) => {
            console.log(isTrainingsDone)

            return (
              <Link
                key={training.url}
                className={styles.training}
                href={
                  "/dashboard/trainings/" +
                  training.category +
                  "/" +
                  training.name
                }
              >
                {training.imageURL ? (
                  <Image src={trainings[index].imageURL} alt={""} />
                ) : (
                  <figure className={styles.trainingImagePlaceholder}></figure>
                )}
                <div className={styles.trainingLower}>
                  <h3 className={styles.trainingHeading}>
                    {trainings[index].strings.EN.name}
                  </h3>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

// export async function getStaticPaths() {
//   const paths: { params: { program: string } }[] = []

//   const allTrainings: any[] = []

//   programsObject.sections.forEach((section) => {
//     allTrainings.push(...section.programs)
//   })

//   const allTrainingsIds = allTrainings.map((training) => training.id)

//   allTrainingsIds.forEach((training) => {
//     paths.push({
//       params: {
//         program: training,
//       },
//     })
//   })

//   return {
//     paths: paths,
//     fallback: false,
//   }
// }
