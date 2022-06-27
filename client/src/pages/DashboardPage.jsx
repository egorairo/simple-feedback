import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Dashboard from '../components/Dashboard'

export default function DashboardPage({path}) {
  return (
    <>
      <Header dashPath={path} />
      <Dashboard />
    </>
  )
}

DashboardPage.propTypes = {
  path: PropTypes.string,
}
