import {createSlice} from '@reduxjs/toolkit'

const idSlice = createSlice({
  name: 'id',
  initialState: '',
  reducers: {
    setId: (state, action) => {
      return action.payload
    },
  },
})

export const {setId} = idSlice.actions

export default idSlice.reducer
