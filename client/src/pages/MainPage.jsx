import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
export default function MainPage({path}) {
  return (
    <>
      <Header path={path} />
      <Main />
      <Footer />
    </>
  )
}

MainPage.propTypes = {
  path: PropTypes.string,
}
