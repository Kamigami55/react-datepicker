import React from 'react'
import PropTypes from 'prop-types'

import CalendarHeader from '../../molecules/CalendarHeader'
import {
  CalendarContent,
  DateButtonDisabled,
  DateButtonNormal,
  DateButtonSelected,
  DateButtonToday,
} from '../Calendar/styles'
import { THIS_YEAR } from '../../../constants/dateConstants'

function CalendarDecadeView(props) {
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

CalendarDecadeView.propTypes = {
  viewDate: PropTypes.shape({
    decade: PropTypes.number,
    year: PropTypes.number,
    month: PropTypes.number,
  }).isRequired,
  selectedDate: PropTypes.shape({
    year: PropTypes.number,
  }).isRequired,
  setViewDate: PropTypes.func.isRequired,
}

export default CalendarDecadeView
