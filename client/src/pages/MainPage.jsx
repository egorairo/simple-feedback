import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Main from '../components/Main'

export default function MainPage({path}) {
  return (
    <>
      <Header path={path} />
      <Main />
    </>
  )
}

MainPage.propTypes = {
  path: PropTypes.string,
}
