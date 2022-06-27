import {createSlice} from '@reduxjs/toolkit'

const namesSlice = createSlice({
  name: 'names',
  initialState: {},
  reducers: {
    setNames: (state, action) => {
      return action.payload
    },
    updateFormNameValue: (state, action) => {
      state.formName = action.payload
    },
    updateNameValue: (state, action) => {
      state.name = action.payload
    },
  },
})

export const {setNames, updateFormNameValue, updateNameValue} =
  namesSlice.actions

export default namesSlice.reducer
