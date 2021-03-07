import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

import ButtonBase from '../../atoms/ButtonBase'

export const ArrowLeftButton = (props) => (
  <ButtonBase {...props}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </ButtonBase>
)

export const ArrowRightButton = (props) => (
  <ButtonBase {...props}>
    <FontAwesomeIcon icon={faChevronRight} />
  </ButtonBase>
)

export const HeaderDateButton = styled(ButtonBase)`
  flex-grow: 1;
`

export const CalendarHeaderButtons = styled.div`
  display: flex;
  margin: 16px;
`
