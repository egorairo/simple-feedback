import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Footer from '../components/Footer'

export default function DashboardPage({path}) {
  return (
    <>
      <Header dashPath={path} />
      <Dashboard />
      <Footer />
    </>
  )
}

DashboardPage.propTypes = {
  path: PropTypes.string,
}
