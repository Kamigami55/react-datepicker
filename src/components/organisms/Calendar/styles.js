import PropTypes from 'prop-types'
import styled from 'styled-components'

export const StyledCalendar = styled.div`
  width: 360px;
  border: 2px solid rgba(150, 150, 150, 0.5);
`

export const CalendarContent = styled.div`
  margin: 16px;
  display: grid;
  grid-template-columns: ${({ gridCols }) =>
    `repeat(${gridCols}, minmax(0, 1fr))`};
  grid-gap: 4px;
`
CalendarContent.propTypes = {
  gridCols: PropTypes.number,
}
CalendarContent.defaultProps = {
  gridCols: 4,
}
