import React from 'react'
import styled from 'styled-components'

import Calendar from './components/organisms/Calendar'
import { THIS_DATE, THIS_MONTH, THIS_YEAR } from './constants/dateConstants'

const Page = styled.main`
  padding: 24px;
`

function App() {
  const [date, setDate] = React.useState({
    year: THIS_YEAR,
    month: THIS_MONTH,
    day: THIS_DATE,
  })

  return (
    <Page>
      <Calendar date={date} onSelect={setDate} />
      {JSON.stringify(date)}
    </Page>
  )
}

export default App
