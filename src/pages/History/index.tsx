// import { useCycles } from '../../store/context/CyclesContext'
import { useCycles } from '../../store/zustand/CyclesStore'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import * as S from './styles'

export function History() {
  // const { cycles } = useCycles()
  const cycles = useCycles((s) => s.cycles)

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <S.Status statusColor="green">Concluído</S.Status>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <S.Status statusColor="yellow">Em andamento</S.Status>
                  )}

                  {cycle.interruptedDate && (
                    <S.Status statusColor="red">Interrompido</S.Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  )
}
