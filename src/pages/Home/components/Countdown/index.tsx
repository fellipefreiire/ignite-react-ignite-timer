import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
// import { useCycles } from '../../../../store/context/CyclesContext'
import { useCycles } from '../../../../store/zustand/CyclesStore'

import * as S from './styles'

export function Countdown() {
  // const {
  // activeCycle,
  // secondsPassedAmount,
  // markCurrentCycleAsFinished,
  // setSecondsPassed,
  // } = useCycles()

  const activeCycle = useCycles((s) => s.activeCycle)
  const secondsPassedAmount = useCycles((s) => s.secondsPassedAmount)
  const markCurrentCycleAsFinished = useCycles(
    (s) => s.markCurrentCycleAsFinished,
  )
  const setSecondsPassed = useCycles((s) => s.setSecondsPassed)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCurrentCycleAsFinished, setSecondsPassed])

  const currentSeconds = activeCycle ? totalSeconds - secondsPassedAmount : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  )
}
