import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import NewsletterSurveyCreate from '../components/NewsletterSurveyCreate'

export default function NewsletterSurveyCreatePage({path}) {
  return (
    <>
      <Header surveyCreatePath={path} />
      <NewsletterSurveyCreate />
    </>
  )
}

NewsletterSurveyCreatePage.propTypes = {
  path: PropTypes.string,
}
