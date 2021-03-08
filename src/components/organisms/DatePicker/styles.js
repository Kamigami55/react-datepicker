import styled from 'styled-components'

import Calendar from '../Calendar'

export const StyledDateInput = styled.input`
  padding: 4px 8px;
`

export const DatePickerCalendar = styled(Calendar)`
  display: ${({ show }) => (show ? 'block' : 'none')};
  border: 2px solid rgba(150, 150, 150, 0.5);
`
