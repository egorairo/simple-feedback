import {configureStore} from '@reduxjs/toolkit'

import votingReducer from './votingReducer'
import extendedReducer from './extendedReducer'
import namesReducer from './namesReducer'
import thanksReducer from './thanksReducer'
import idReducer from './idReducer'
import tokenReducer from './tokenReducer'

const store = configureStore({
  reducer: {
    names: namesReducer,
    votingValues: votingReducer,
    extendedValues: extendedReducer,
    thanksValues: thanksReducer,
    id: idReducer,
    token: tokenReducer,
  },
})

export default store
