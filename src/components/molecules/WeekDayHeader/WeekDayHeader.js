import React from 'react'

import { WEEK_DAYS } from '../../../constants/dateConstants'
import { WeekDayText } from './styles'

function WeekDayHeader() {
  return (
    <>
      {WEEK_DAYS.map((dayText) => (
        <WeekDayText key={dayText}>{dayText}</WeekDayText>
      ))}
    </>
  )
}

export default WeekDayHeader
