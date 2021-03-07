import styled from 'styled-components'

import {
  COLOR_GRAY,
  COLOR_RED,
  COLOR_RED_LIGHT,
} from '../../../constants/theme'
import RoundButton from '../RoundButton'

export const DateButtonNormal = styled(RoundButton)`
  color: black;
  background-color: transparent;
`

export const DateButtonToday = styled(DateButtonNormal)`
  color: ${COLOR_RED};
`

export const DateButtonSelected = styled(RoundButton)`
  color: white;
  background-color: ${COLOR_RED};
  &:hover {
    background-color: ${COLOR_RED_LIGHT};
  }
`

export const DateButtonDisabled = styled(RoundButton).attrs({
  disabled: true,
})`
  color: ${COLOR_GRAY};
  cursor: default;
  &,
  &:hover,
  &:active {
    background-color: transparent;
  }
`
