import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import DefaultSurvey from '../components/DefaultSurvey'

export default function DefaultSurveyPage({path}) {
  return (
    <>
      <Header feedbackPath={path} />
      <DefaultSurvey />
    </>
  )
}

DefaultSurveyPage.propTypes = {
  path: PropTypes.string,
}
