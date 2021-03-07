import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  CALENDAR_MONTHS,
  THIS_YEAR,
  THIS_MONTH,
  THIS_DATE,
} from '../../../constants/dateConstants'
import {
  getMonthDays,
  getMonthFirstDay,
  getPreviousMonth,
  monthText,
} from '../../../utils/dateUtils'
import {
  DateButtonDisabled,
  DateButtonNormal,
  DateButtonSelected,
  DateButtonToday,
  StyledCalendar,
  CalendarContent,
} from './styles'
import CalendarHeader from '../../molecules/CalendarHeader'
import WeekDayHeader from '../../molecules/WeekDayHeader'

// ==================== Styled components ====================

function DecadeView(props) {
  const { viewDate, setViewDate, selectedDate } = props
  const { year: selectedYear } = selectedDate
  const { decade: viewDecade, year: viewYear, month: viewMonth } = viewDate

  const goPrevDecade = () => {
    const prevDecade = viewDecade - 10 // TODO 負數問題
    setViewDate({ decade: prevDecade, year: viewYear, month: viewMonth })
  }
  const goNextDecade = () => {
    const nextDecade = viewDecade + 10
    setViewDate({ decade: nextDecade, year: viewYear, month: viewMonth })
  }
  const selectYear = (year) => {
    setViewDate({ decade: viewDecade, year: year, month: null })
  }

  return (
    <>
      <CalendarHeader onPrevClick={goPrevDecade} onNextClick={goNextDecade}>
        {`${viewDecade}-${viewDecade + 9}`}
      </CalendarHeader>

      <CalendarContent gridCols={4}>
        <DateButtonDisabled>{viewDecade - 1}</DateButtonDisabled>
        {[...new Array(10)].map((_, index) => {
          const year = viewDecade + index
          const isTodayYear = year === THIS_YEAR
          const isSelected = year === selectedYear
          const ButtonComponent = isSelected
            ? DateButtonSelected
            : isTodayYear
            ? DateButtonToday
            : DateButtonNormal
          return (
            <ButtonComponent key={year} onClick={() => selectYear(year)}>
              {year}
            </ButtonComponent>
          )
        })}
        <DateButtonDisabled>{viewDecade + 10}</DateButtonDisabled>
      </CalendarContent>
    </>
  )
}

function YearView(props) {
  const { viewDate, setViewDate, selectedDate } = props
  const { year: selectedYear, month: selectedMonth } = selectedDate
  const { decade: viewDecade, year: viewYear, month: viewMonth } = viewDate

  const goPrevYear = () => {
    const prevYear = viewYear - 1 // TODO 處理負數年問題
    const prevDecade = viewYear % 10 === 0 ? viewDecade - 10 : viewDecade
    setViewDate({ decade: prevDecade, year: prevYear, month: viewMonth })
  }
  const goNextYear = () => {
    const nextYear = viewYear + 1
    const nextDecade = viewYear % 10 === 9 ? viewDecade + 10 : viewDecade
    setViewDate({ decade: nextDecade, year: nextYear, month: viewMonth })
  }
  const goDecadeView = () => {
    setViewDate({ decade: viewDecade, year: null, month: null })
  }
  const selectMonth = (month) => {
    setViewDate({ decade: viewDecade, year: viewYear, month: month })
  }

  return (
    <>
      <CalendarHeader
        onPrevClick={goPrevYear}
        onCenterClick={goDecadeView}
        onNextClick={goNextYear}
      >
        {viewYear}
      </CalendarHeader>

      <CalendarContent gridCols={4}>
        {CALENDAR_MONTHS.map((monthText, index) => {
          const monthNum = index + 1
          const isThisMonth = viewYear === THIS_YEAR && monthNum === THIS_MONTH
          const isSelected =
            viewYear === selectedYear && monthNum === selectedMonth
          const ButtonComponent = isSelected
            ? DateButtonSelected
            : isThisMonth
            ? DateButtonToday
            : DateButtonNormal
          return (
            <ButtonComponent
              key={monthNum}
              onClick={() => selectMonth(monthNum)}
            >
              {monthText}
            </ButtonComponent>
          )
        })}
      </CalendarContent>
    </>
  )
}

function MonthView(props) {
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

// ==================== Calendar itself ====================

function Calendar(props) {
  const { date: selectedDate, onSelect } = props
  const [viewDate, setViewDate] = useState({
    decade: 2020,
    year: 2021,
    month: 3,
  })
  const { year: viewYear, month: viewMonth } = viewDate

  const renderView = () => {
    if (viewMonth !== null)
      return (
        <MonthView
          viewDate={viewDate}
          setViewDate={setViewDate}
          selectedDate={selectedDate}
          onSelect={onSelect}
        />
      )
    if (viewYear !== null)
      return (
        <YearView
          viewDate={viewDate}
          setViewDate={setViewDate}
          selectedDate={selectedDate}
        />
      )
    return (
      <DecadeView
        viewDate={viewDate}
        setViewDate={setViewDate}
        selectedDate={selectedDate}
      />
    )
  }

  return <StyledCalendar>{renderView()}</StyledCalendar>
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
