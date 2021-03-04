import React from 'react'
import styled from 'styled-components'

import Calendar from './components/Calendar'

const Page = styled.main`
  padding: 24px;
`

function App() {
  const [date, setDate] = React.useState({ year: 2021, month: 3, day: 4 })

  return (
    <Page>
      <Calendar date={date} onSelect={setDate} />
      {JSON.stringify(date)}
    </Page>
  )
}

export default App
