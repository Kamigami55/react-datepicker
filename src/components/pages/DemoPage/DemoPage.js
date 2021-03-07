import React from 'react'

import {
  THIS_DATE,
  THIS_MONTH,
  THIS_YEAR,
} from '../../../constants/dateConstants'
import DemoPageTemplate from '../../templates/DemoPageTemplate'

function DemoPage() {
  const [calendarDate, setCalendarDate] = React.useState({
    year: THIS_YEAR,
    month: THIS_MONTH,
    day: THIS_DATE,
  })

  return (
    <DemoPageTemplate
      calendarDate={calendarDate}
      setCalendarDate={setCalendarDate}
    />
  )
}

export default DemoPage
