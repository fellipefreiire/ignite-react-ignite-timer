import * as S from './Button.styles'
import { ButtonVariant } from './Button.styles'

interface IButtonProps {
  variant?: ButtonVariant
}

export function Button({
  variant = 'primary'
}: IButtonProps) {
  return (
    <S.ButtonContainer variant={variant}>
      Enviar
    </S.ButtonContainer>
  )
}