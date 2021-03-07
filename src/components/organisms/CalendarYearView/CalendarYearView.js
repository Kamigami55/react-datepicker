import React from 'react'
import PropTypes from 'prop-types'

import CalendarHeader from '../../molecules/CalendarHeader'
import { CalendarContent } from '../Calendar/styles'
import {
  DateButtonNormal,
  DateButtonSelected,
  DateButtonToday,
} from '../../atoms/DateButton'
import {
  CALENDAR_MONTHS,
  THIS_MONTH,
  THIS_YEAR,
} from '../../../constants/dateConstants'

function CalendarYearView(props) {
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

CalendarYearView.propTypes = {
  viewDate: PropTypes.shape({
    decade: PropTypes.number,
    year: PropTypes.number,
    month: PropTypes.number,
  }).isRequired,
  selectedDate: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
  }).isRequired,
  setViewDate: PropTypes.func.isRequired,
}

export default CalendarYearView
