---
to: src/components/<%= componentType %>/<%= componentName %>/<%= componentName %>.js
---
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function <%= componentName %>(props) {
  return (
    <div><%= componentName %></div>
  )
}

<%= componentName %>.propTypes = {}

<%= componentName %>.defaultProps = {}

export default <%= componentName %>
