import {createSlice} from '@reduxjs/toolkit'

const votingValuesSlice = createSlice({
  name: 'votingValues',
  initialState: {},
  reducers: {
    setVotingValues: (state, action) => {
      return action.payload
    },
    updateThumbsHeadlineValue: (state, action) => {
      state.thumbsHeadline = action.payload
    },
    updateThumbsParagraphValue: (state, action) => {
      state.thumbsParagraph = action.payload
    },
    updateThumbsupValue: (state, action) => {
      state.thumbsup = action.payload
    },
    updateThumbsokValue: (state, action) => {
      state.thumbsok = action.payload
    },
    updateThumbsdownValue: (state, action) => {
      state.thumbsdown = action.payload
    },
  },
})

export const {
  setVotingValues,
  updateThumbsHeadlineValue,
  updateThumbsParagraphValue,
  updateThumbsupValue,
  updateThumbsokValue,
  updateThumbsdownValue,
} = votingValuesSlice.actions

export default votingValuesSlice.reducer
