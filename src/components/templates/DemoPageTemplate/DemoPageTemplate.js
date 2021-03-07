import React from 'react'
import PropTypes from 'prop-types'

import Calendar from '../../organisms/Calendar'
import { Page } from './styled'

function DemoPageTemplate(props) {
  const { calendarDate, setCalendarDate } = props

  return (
    <Page>
      <Calendar date={calendarDate} onSelect={setCalendarDate} />
      <br />
      <p>Selected date: {JSON.stringify(calendarDate)}</p>
    </Page>
  )
}

DemoPageTemplate.propTypes = {
  calendarDate: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  setCalendarDate: PropTypes.func.isRequired,
}

export default DemoPageTemplate
