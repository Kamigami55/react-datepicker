import styled from 'styled-components'

import { COLOR_GRAY } from '../../../constants/theme'

const ButtonBase = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 2px;
  transition: all 200ms;
  &:hover {
    background-color: ${COLOR_GRAY};
  }
  &:active {
    background-color: rgba(150, 150, 150, 0.5);
  }
`

export default ButtonBase
