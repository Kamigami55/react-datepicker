import React from 'react'
import PropTypes from 'prop-types'

import {
  getMonthDays,
  getMonthFirstDay,
  getPreviousMonth,
  monthText,
} from '../../../utils/dateUtils'
import CalendarHeader from '../../molecules/CalendarHeader'
import {
  CalendarContent,
  DateButtonDisabled,
  DateButtonNormal,
  DateButtonSelected,
  DateButtonToday,
} from '../Calendar/styles'
import WeekDayHeader from '../../molecules/WeekDayHeader'
import {
  THIS_DATE,
  THIS_MONTH,
  THIS_YEAR,
} from '../../../constants/dateConstants'

function CalendarMonthView(props) {
  const { viewDate, setViewDate, selectedDate, onSelect } = props
  const {
    year: selectedYear,
    month: selectedMonth,
    day: selectedDay,
  } = selectedDate
  const { decade: viewDecade, year: viewYear, month: viewMonth } = viewDate

  const goPrevMonth = () => {
    const prevMonth = viewMonth > 1 ? viewMonth - 1 : 12
    const prevYear = viewMonth > 1 ? viewYear : viewYear - 1 // TODO 處理負數年問題
    const prevDecade =
      viewMonth === 1 && viewYear % 10 === 0 ? viewDecade - 10 : viewDecade
    setViewDate({ decade: prevDecade, year: prevYear, month: prevMonth })
  }
  const goNextMonth = () => {
    const nextMonth = viewMonth < 12 ? viewMonth + 1 : 1
    const nextYear = viewMonth < 12 ? viewYear : viewYear + 1
    const nextDecade =
      viewMonth === 12 && viewYear % 10 === 9 ? viewDecade + 10 : viewDecade
    setViewDate({ decade: nextDecade, year: nextYear, month: nextMonth })
  }
  const goYearView = () => {
    setViewDate({ decade: viewDecade, year: viewYear, month: null })
  }
  const selectDay = (day) => {
    onSelect({ year: viewYear, month: viewMonth, day: day })
  }

  const monthDays = getMonthDays(viewMonth, viewYear)
  const monthFirstDay = getMonthFirstDay(viewMonth, viewYear)

  const daysFromPrevMonth = monthFirstDay - 1
  const daysFromNextMonth = 6 * 7 - (daysFromPrevMonth + monthDays)

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(
    viewMonth,
    viewYear
  )

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear)

  return (
    <>
      <CalendarHeader
        onPrevClick={goPrevMonth}
        onCenterClick={goYearView}
        onNextClick={goNextMonth}
      >
        {monthText(viewDate.month)} {viewDate.year}
      </CalendarHeader>

      <CalendarContent gridCols={7}>
        <WeekDayHeader />

        {/* days of prev month */}
        {[...new Array(daysFromPrevMonth)].map((_, index) => {
          const day = index + 1 + (prevMonthDays - daysFromPrevMonth)
          return <DateButtonDisabled key={day}>{day}</DateButtonDisabled>
        })}

        {/* days of current month */}
        {[...new Array(monthDays)].map((_, index) => {
          const day = index + 1
          const isToday =
            viewYear === THIS_YEAR &&
            viewMonth === THIS_MONTH &&
            day === THIS_DATE
          const isSelected =
            viewYear === selectedYear &&
            viewMonth === selectedMonth &&
            day === selectedDay
          const ButtonComponent = isSelected
            ? DateButtonSelected
            : isToday
            ? DateButtonToday
            : DateButtonNormal
          return (
            <ButtonComponent key={day} onClick={() => selectDay(day)}>
              {day}
            </ButtonComponent>
          )
        })}

        {/* days of next month */}
        {[...new Array(daysFromNextMonth)].map((_, index) => {
          const day = index + 1
          return <DateButtonDisabled key={day}>{day}</DateButtonDisabled>
        })}
      </CalendarContent>
    </>
  )
}

CalendarMonthView.propTypes = {
  viewDate: PropTypes.shape({
    decade: PropTypes.number,
    year: PropTypes.number,
    month: PropTypes.number,
  }).isRequired,
  selectedDate: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }).isRequired,
  setViewDate: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default CalendarMonthView
