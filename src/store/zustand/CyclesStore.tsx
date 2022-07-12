import create from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

interface ICyclesStore {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  secondsPassedAmount: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: ICreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const useCycles = create<ICyclesStore>()(
  persist(
    immer((set) => ({
      cycles: [],
      activeCycle: undefined,
      activeCycleId: null,
      secondsPassedAmount: 0,
      createNewCycle: (data) =>
        set((state) => {
          const id = String(new Date().getTime())
          const newCycle: ICycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
          }
          state.cycles.push(newCycle)
          state.activeCycle = newCycle
          state.activeCycleId = newCycle.id
          state.secondsPassedAmount = 0
        }),
      interruptCurrentCycle: () =>
        set((state) => {
          const currentCycleIndex = state.cycles.findIndex((cycle) => {
            return cycle.id === state.activeCycleId
          })

          if (currentCycleIndex < 0) {
            return state
          }

          state.activeCycleId = null
          state.activeCycle = undefined
          state.cycles[currentCycleIndex].interruptedDate = new Date()
        }),
      markCurrentCycleAsFinished: () =>
        set((state) => {
          const currentCycleIndex = state.cycles.findIndex((cycle) => {
            return cycle.id === state.activeCycleId
          })

          if (currentCycleIndex < 0) {
            return state
          }

          state.activeCycleId = null
          state.activeCycle = undefined
          state.cycles[currentCycleIndex].finishedDate = new Date()
        }),
      setSecondsPassed: (seconds) =>
        set((state) => {
          state.secondsPassedAmount = seconds
        }),
    })),
    {
      name: '@ignite-timer:cycles-state-1.0.0',
    },
  ),
)
