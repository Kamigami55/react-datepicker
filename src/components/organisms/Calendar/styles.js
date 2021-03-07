import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

const COLOR_RED = '#db3d44'
const COLOR_RED_LIGHT = '#fd616b'
const COLOR_GRAY = '#eeeeee'

const ButtonBase = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 2px;
  transition: all 100ms;
  &:hover {
    background-color: ${COLOR_GRAY};
  }
  &:active {
    background-color: rgba(150, 150, 150, 0.5);
  }
`

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

export const StyledCalendar = styled.div`
  width: 360px;
  border: 2px solid rgba(150, 150, 150, 0.5);
`

export const HeaderDateButton = styled(ButtonBase)`
  flex-grow: 1;
`

export const CalendarHeader = styled.div`
  display: flex;
  margin: 16px;
`

export const CalendarContent = styled.div`
  margin: 16px;
`

export const YearViewContent = styled(CalendarContent)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  //grid-template-columns: auto auto auto auto;
  grid-gap: 4px;
`

export const MonthViewContent = styled(CalendarContent)`
  display: grid;
  //grid-template-columns: auto auto auto auto auto auto auto;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-gap: 4px;
`

export const WeekDayText = styled.strong`
  text-align: center;
  padding: 8px;
`

const RoundButtonOuter = styled(ButtonBase)`
  position: relative;
  height: 0;
  padding: 100% 0 0 0; // 1:1 aspect ratio
  border-radius: 100%;
`
const RoundButtonInner = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const RoundButton = ({ children, ...otherProps }) => (
  <RoundButtonOuter {...otherProps}>
    <RoundButtonInner>{children}</RoundButtonInner>
  </RoundButtonOuter>
)

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
