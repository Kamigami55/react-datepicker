import React from 'react'
import PropTypes from 'prop-types'

import { toDateObject, toDateString } from '../../../utils/dateUtils'
import { DatePickerCalendar, StyledDateInput } from './styles'

function DatePicker(props) {
  const { date, onChange } = props

  const [showCalendar, setShowCalendar] = React.useState(false)
  const handleInputClick = () => setShowCalendar((prevShow) => !prevShow)

  const handleInputChange = (event) => {
    onChange(event.target.value)
    setShowCalendar(false)
  }

  const handleCalendarSelect = (selectedDate) => {
    onChange(toDateString(selectedDate))
    setShowCalendar(false)
  }

  return (
    <>
      <StyledDateInput
        type="text"
        value={date}
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      <DatePickerCalendar
        show={showCalendar}
        date={toDateObject(date)}
        onSelect={handleCalendarSelect}
      />
    </>
  )
}

DatePicker.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func,
}

DatePicker.defaultProps = {
  onChange: () => {},
}

export default DatePicker
