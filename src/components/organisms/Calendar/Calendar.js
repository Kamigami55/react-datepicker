import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { StyledCalendar } from './styles'
import CalendarDecadeView from '../CalendarDecadeView'
import CalendarMonthView from '../CalendarMonthView'
import CalendarYearView from '../CalendarYearView'

function Calendar(props) {
  const { date: selectedDate, onSelect, ...other } = props
  const [viewDate, setViewDate] = useState({
    decade: 2020,
    year: 2021,
    month: 3,
  })
  const { year: viewYear, month: viewMonth } = viewDate

  const renderView = () => {
    if (viewMonth !== null)
      return (
        <CalendarMonthView
          viewDate={viewDate}
          setViewDate={setViewDate}
          selectedDate={selectedDate}
          onSelect={onSelect}
        />
      )
    if (viewYear !== null)
      return (
        <CalendarYearView
          viewDate={viewDate}
          setViewDate={setViewDate}
          selectedDate={selectedDate}
        />
      )
    return (
      <CalendarDecadeView
        viewDate={viewDate}
        setViewDate={setViewDate}
        selectedDate={selectedDate}
      />
    )
  }

  return <StyledCalendar {...other}>{renderView()}</StyledCalendar>
}

Calendar.propTypes = {
  date: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
  }),
  onSelect: PropTypes.func,
}

export default Calendar
