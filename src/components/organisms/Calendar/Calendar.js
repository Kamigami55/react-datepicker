import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  CALENDAR_MONTHS,
  WEEK_DAYS,
  THIS_YEAR,
  THIS_MONTH,
  THIS_DATE,
} from '../../../constants/dateConstants'
import {
  getMonthDays,
  getMonthFirstDay,
  getNextMonth,
  getPreviousMonth,
  monthText,
} from '../../../utils/dateUtils'
import {
  ArrowLeftButton,
  ArrowRightButton,
  CalendarHeader,
  DateButtonDisabled,
  DateButtonNormal,
  DateButtonSelected,
  DateButtonToday,
  HeaderDateButton,
  MonthViewContent,
  StyledCalendar,
  WeekDayText,
  YearViewContent,
} from './styles'

// ==================== Constants ====================

const COLOR_RED = '#db3d44'

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
      <button onClick={goPrevDecade}>L</button>
      <button>{`${viewDecade}-${viewDecade + 9}`}</button>
      <button onClick={goNextDecade}>R</button>
      <br />

      <YearViewContent>
        <button disabled>{viewDecade - 1}</button>
        {[...new Array(10)].map((_, index) => {
          const year = viewDecade + index
          const isTodayYear = year === THIS_YEAR
          const isSelected = year === selectedYear
          return (
            <button
              key={year}
              onClick={() => selectYear(year)}
              style={{
                color: isSelected ? 'white' : isTodayYear ? COLOR_RED : 'black',
                backgroundColor: isSelected ? COLOR_RED : 'white',
              }}
            >
              {year}
            </button>
          )
        })}
        <button disabled>{viewDecade + 10}</button>
      </YearViewContent>
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
      <button onClick={goPrevYear}>L</button>
      <button onClick={goDecadeView}>{viewYear}</button>
      <button onClick={goNextYear}>R</button>
      <br />
      <YearViewContent>
        {CALENDAR_MONTHS.map((monthText, index) => {
          const monthNum = index + 1
          const isThisMonth = viewYear === THIS_YEAR && monthNum === THIS_MONTH
          const isSelected =
            viewYear === selectedYear && monthNum === selectedMonth
          return (
            <button
              key={monthNum}
              onClick={() => selectMonth(monthNum)}
              style={{
                color: isSelected ? 'white' : isThisMonth ? COLOR_RED : 'black',
                backgroundColor: isSelected ? COLOR_RED : 'white',
              }}
            >
              {monthText}
            </button>
          )
        })}
      </YearViewContent>
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
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(
    viewMonth,
    viewYear
  )

  const prevMonthDays = getMonthDays(prevMonth, prevMonthYear)

  return (
    <>
      <CalendarHeader>
        <ArrowLeftButton onClick={goPrevMonth} />
        <HeaderDateButton onClick={goYearView}>
          {monthText(viewDate.month)} {viewDate.year}
        </HeaderDateButton>
        <ArrowRightButton onClick={goPrevMonth} />
      </CalendarHeader>

      <MonthViewContent>
        {WEEK_DAYS.map((dayText) => (
          <WeekDayText key={dayText}>{dayText}</WeekDayText>
        ))}

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
      </MonthViewContent>
    </>
  )
}

// ==================== Calendar itself ====================

function Calendar(props) {
  const { date: selectedDate, onSelect } = props
  // const { year, month, day } = selectedDate
  const [viewDate, setViewDate] = useState({
    decade: 2020,
    year: 2021,
    month: 3,
  })
  const { decade: viewDecade, year: viewYear, month: viewMonth } = viewDate

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
