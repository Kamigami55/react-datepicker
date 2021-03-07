import React from 'react'
import PropTypes from 'prop-types'

import {
  ArrowLeftButton,
  ArrowRightButton,
  CalendarHeaderButtons,
  HeaderDateButton,
} from './styles'

function CalendarHeader(props) {
  const { children, onPrevClick, onNextClick, onCenterClick, ...other } = props
  return (
    <CalendarHeaderButtons {...other}>
      <ArrowLeftButton onClick={onPrevClick} />
      <HeaderDateButton onClick={onCenterClick}>{children}</HeaderDateButton>
      <ArrowRightButton onClick={onNextClick} />
    </CalendarHeaderButtons>
  )
}

CalendarHeader.propTypes = {
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onCenterClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

CalendarHeader.defaultProps = {
  onPrevClick: () => {},
  onNextClick: () => {},
  onCenterClick: () => {},
  children: '',
}

export default CalendarHeader
