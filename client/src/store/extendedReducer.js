import {createSlice} from '@reduxjs/toolkit'

const extendedValuesSlice = createSlice({
  name: 'extendedValues',
  initialState: {},
  reducers: {
    setExtendedValues: (state, action) => {
      return action.payload
    },
    updateThankYouLineValue: (state, action) => {
      state.thankYouLine = action.payload
    },
    updateThumbsupReasonHeaderValue: (state, action) => {
      state.thumbsupReasonHeader = action.payload
    },
    updateThumbsokReasonHeaderValue: (state, action) => {
      state.thumbsokReasonHeader = action.payload
    },
    updateThumbsdownReasonHeaderValue: (state, action) => {
      state.thumbsdownReasonHeader = action.payload
    },
    updateEfpWhyBoxTextValue: (state, action) => {
      state.efpWhyBoxText = action.payload
    },
    updateEfpWhyBoxPlaceholderValue: (state, action) => {
      state.efpWhyBoxPlaceholder = action.payload
    },
    updateEfpReaderNamePlaceholderValue: (state, action) => {
      state.efpReaderNamePlaceholder = action.payload
    },
    updateEfpReaderEmailPlaceholderValue: (state, action) => {
      state.efpReaderEmailPlaceholder = action.payload
    },
    updateEfpButtonTextValue: (state, action) => {
      state.efpButtonText = action.payload
    },
  },
})

export const {
  setExtendedValues,
  updateThankYouLineValue,
  updateThumbsupReasonHeaderValue,
  updateThumbsokReasonHeaderValue,
  updateThumbsdownReasonHeaderValue,
  updateEfpWhyBoxTextValue,
  updateEfpWhyBoxPlaceholderValue,
  updateEfpReaderNamePlaceholderValue,
  updateEfpReaderEmailPlaceholderValue,
  updateEfpButtonTextValue,
} = extendedValuesSlice.actions

export default extendedValuesSlice.reducer
