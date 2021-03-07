import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  COLOR_RED_LIGHT,
  COLOR_GRAY,
  COLOR_RED,
} from '../../../constants/theme'
import ButtonBase from '../../atoms/ButtonBase'

export const StyledCalendar = styled.div`
  width: 360px;
  border: 2px solid rgba(150, 150, 150, 0.5);
`

export const CalendarContent = styled.div`
  margin: 16px;
  display: grid;
  grid-template-columns: ${({ gridCols }) =>
    `repeat(${gridCols}, minmax(0, 1fr))`};
  grid-gap: 4px;
`
CalendarContent.propTypes = {
  gridCols: PropTypes.number,
}
CalendarContent.defaultProps = {
  gridCols: 4,
}

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

const RoundButton = ({ children, ...other }) => (
  <RoundButtonOuter {...other}>
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
