import React from 'react'
import PropTypes from 'prop-types'

import FAQ from '../components/FAQ'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function DashboardPage({path}) {
  return (
    <>
      <Header path={path} />
      <FAQ />
      <Footer />
    </>
  )
}

DashboardPage.propTypes = {
  path: PropTypes.string,
}
