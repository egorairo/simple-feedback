import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import DefaultSurvey from '../components/DefaultSurvey'
import Footer from '../components/Footer'

export default function DefaultSurveyPage({path}) {
  return (
    <>
      <Header defaultSurveyPath={path} />
      <DefaultSurvey />
      <Footer />
    </>
  )
}

DefaultSurveyPage.propTypes = {
  path: PropTypes.string,
}
