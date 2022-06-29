import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Feedback from '../components/Feedback'

export default function FeedbackPage({path}) {
  return (
    <>
      <Header surveyPath={path} />
      <Feedback />
    </>
  )
}

FeedbackPage.propTypes = {
  path: PropTypes.string,
}
