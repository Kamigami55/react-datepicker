import React from 'react'
import PropTypes from 'prop-types'

import Calendar from '../../organisms/Calendar'
import DatePicker from '../../organisms/DatePicker'
import { BlankPlaceholder, Page } from './styled'

function DemoPageTemplate(props) {
  const {
    calendarDate,
    setCalendarDate,
    datePickerDate,
    setDatePickerDate,
  } = props

  return (
    <Page>
      <h1>Date picker demo by Eason Chang</h1>
      <h2>Calendar</h2>
      <Calendar date={calendarDate} onSelect={setCalendarDate} />
      <br />
      <p>Selected date: {JSON.stringify(calendarDate)}</p>

      <hr />

      <h2>DatePicker</h2>
      <DatePicker date={datePickerDate} onChange={setDatePickerDate} />
      <BlankPlaceholder />
    </Page>
  )
}

DemoPageTemplate.propTypes = {
  calendarDate: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  setCalendarDate: PropTypes.func,
  /** ISO format string */
  datePickerDate: PropTypes.string,
  setDatePickerDate: PropTypes.func,
}

export default DemoPageTemplate
