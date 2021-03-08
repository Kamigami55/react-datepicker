import React from 'react'

import { TODAY_OBJECT } from '../../../constants/dateConstants'
import DemoPageTemplate from '../../templates/DemoPageTemplate'
import { toDateString } from '../../../utils/dateUtils'

function DemoPage() {
  const [calendarDate, setCalendarDate] = React.useState(TODAY_OBJECT)

  const [datePickerDate, setDatePickerDate] = React.useState(
    toDateString(TODAY_OBJECT)
  )

  return (
    <DemoPageTemplate
      calendarDate={calendarDate}
      setCalendarDate={setCalendarDate}
      datePickerDate={datePickerDate}
      setDatePickerDate={setDatePickerDate}
    />
  )
}

export default DemoPage
