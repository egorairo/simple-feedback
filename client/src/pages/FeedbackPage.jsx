import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Feedback from '../components/Feedback'
import Footer from '../components/Footer'
export default function FeedbackPage({path}) {
  return (
    <>
      <Header surveyPath={path} />
      <Feedback />
      <Footer />
    </>
  )
}

FeedbackPage.propTypes = {
  path: PropTypes.string,
}
