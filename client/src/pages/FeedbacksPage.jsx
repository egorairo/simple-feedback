import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Feedbacks from '../components/Feedbacks'
import Footer from '../components/Footer'
export default function FeedbacksPage({path}) {
  return (
    <>
      <Header surveysPath={path} />
      <Feedbacks />
      <Footer />
    </>
  )
}

FeedbacksPage.propTypes = {
  path: PropTypes.string,
}
