import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ButtonBase from '../ButtonBase'

const RoundButtonOuter = styled(ButtonBase)`
  position: relative;
  height: 0;
  padding: 100% 0 0 0; // 1:1 aspect ratio
  border-radius: 100%;
`
const RoundButtonInner = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

function RoundButton({ children, ...other }) {
  return (
    <RoundButtonOuter {...other}>
      <RoundButtonInner>{children}</RoundButtonInner>
    </RoundButtonOuter>
  )
}

RoundButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default RoundButton
