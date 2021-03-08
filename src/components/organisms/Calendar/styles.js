import styled from 'styled-components'

export const StyledCalendar = styled.div`
  width: 100%;
  max-width: 360px;
`

const CalendarContent = styled.div`
  margin: 16px;
  display: -ms-grid;
  display: grid;
  grid-gap: 4px;
`

export const CalendarContent4Col = styled(CalendarContent)`
  -ms-grid-columns: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

export const CalendarContent7Col = styled(CalendarContent)`
  -ms-grid-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`
