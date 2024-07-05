type ArrayOfRepsFunctionType = (
  maxRep: number,
  modifier: number,
  firstRepModifier: number,
  nextRepModifier: number
) => number[][]

export const getArrayOfReps: ArrayOfRepsFunctionType = (
  maxRep,
  modifier,
  firstRepModifier,
  nextRepModifier
) => {
  const firstRep = maxRep * firstRepModifier

  const tempResult = []

  const firstDay = fillRepsArray(firstRep, nextRepModifier)

  tempResult.push(firstDay)

  for (let i = 1; i < 3; i++) {
    const firstRep = tempResult[i - 1][0] * modifier
    const temp = fillRepsArray(firstRep, nextRepModifier)

    tempResult.push(temp)
  }

  const result = tempResult.map((repsArray) =>
    repsArray.map((rep) => Math.floor(rep))
  )

  return result
}

export function fillRepsArray(firstRep: number, nextRepModifier: number) {
  let temp = firstRep

  const result = [firstRep]

  for (let i = 1; i < 5; i++) {
    temp = temp * nextRepModifier
    result.push(temp)
  }

  return result
}
