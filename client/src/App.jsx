import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import store from './store/store'
import {Provider} from 'react-redux'

import Routing from './Routing'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  )
}

export default App
