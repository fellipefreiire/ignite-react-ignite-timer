import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import * as S from './styles'

interface ICountdownProps {
  activeCycleId: any
  activeCycle: any
  setCycles: any
}

export function Countdown({
  activeCycleId,
  activeCycle,
  setCycles,
}: ICountdownProps) {
  const [secondsPassedAmount, setSecondsPassedAmount] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )

          setSecondsPassedAmount(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassedAmount(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

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
