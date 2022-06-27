import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Login from '../components/Login'

export default function LoginPage({path}) {
  return (
    <>
      <Header path={path} />
      <Login />
    </>
  )
}

LoginPage.propTypes = {
  path: PropTypes.string,
}
