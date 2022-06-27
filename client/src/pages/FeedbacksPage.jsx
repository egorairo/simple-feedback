import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Feedbacks from '../components/Feedbacks'

export default function FeedbacksPage({path}) {
  return (
    <>
      <Header feedbacksPath={path} />
      <Feedbacks />
    </>
  )
}

FeedbacksPage.propTypes = {
  path: PropTypes.string,
}
