import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import Register from '../components/Register'

export default function RegisterPag({path}) {
  return (
    <>
      <Header path={path} />
      <Register />
    </>
  )
}

RegisterPag.propTypes = {
  path: PropTypes.string,
}
