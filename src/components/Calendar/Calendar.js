import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CALENDAR_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const zeroPad = (value, length) => `${value}`.padStart(length, '0')

const getMonthDays = (month, year) => {
  const months30 = [4, 6, 9, 11]
  const leapYear = year % 4 === 0 // TODO 更詳細閏年判定

  return month === 2 ? (leapYear ? 29 : 28) : months30.includes(month) ? 30 : 31
}

const getMonthFirstDay = (month, year) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1
}

const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12
  const prevMonthYear = month > 1 ? year : year - 1

  return { month: prevMonth, year: prevMonthYear }
}

const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1
  const nextMonthYear = month < 12 ? year : year + 1

  return { month: nextMonth, year: nextMonthYear }
}

function monthText(monthNum) {
  if (monthNum < 1 || monthNum > 12) return '???'
  return CALENDAR_MONTHS[monthNum - 1]
}

const YearViewContent = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`

function DecadeView(props) {
  const { viewDate, setViewDate, selectedDate } = props
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
          return (
            <button key={year} onClick={() => selectYear(year)}>
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
          return (
            <button key={monthNum} onClick={() => selectMonth(monthNum)}>
              {monthText}
            </button>
          )
        })}
      </YearViewContent>
    </>
  )
}

const MonthViewContent = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
`

function MonthView(props) {
  const { viewDate, setViewDate, selectedDate, onSelect } = props
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
      <button onClick={goPrevMonth}>L</button>
      <button onClick={goYearView}>
        {monthText(viewDate.month)} {viewDate.year}
      </button>
      <button onClick={goNextMonth}>R</button>
      <br />

      <MonthViewContent>
        {/* days of prev month */}
        {WEEK_DAYS.map((dayText) => (
          <strong key={dayText}>{dayText}</strong>
        ))}
        {[...new Array(daysFromPrevMonth)].map((_, index) => {
          const day = index + 1 + (prevMonthDays - daysFromPrevMonth)
          return (
            <button disabled key={day}>
              {day}
            </button>
          )
        })}
        {/* days of current month */}
        {[...new Array(monthDays)].map((_, index) => {
          const day = index + 1
          return (
            <button key={day} onClick={() => selectDay(day)}>
              {day}
            </button>
          )
        })}
        {/* days of next month */}
        {[...new Array(daysFromNextMonth)].map((_, index) => {
          const day = index + 1
          return (
            <button disabled key={day}>
              {day}
            </button>
          )
        })}
      </MonthViewContent>
    </>
  )
}

const StyledCalendar = styled.div`
  width: 400px;
  border: 1px solid gray;
`

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
