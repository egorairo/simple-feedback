import {createSlice} from '@reduxjs/toolkit'

const thanksValuesSlice = createSlice({
  name: 'thanksValues',
  initialState: {},
  reducers: {
    setThanksValues: (state, action) => {
      return action.payload
    },
    updateTypHeadlineValue: (state, action) => {
      state.typHeadline = action.payload
    },
    updateTypSubHeadlineValue: (state, action) => {
      state.typSubHeadline = action.payload
    },
    updateTypShareTwitterHandleValue: (state, action) => {
      state.typShareTwitterHandle = action.payload
    },
    updateTypShareButtonTwitterValue: (state, action) => {
      state.typShareButtonTwitter = action.payload
    },
    updateTypRedirectValue: (state, action) => {
      state.typRedirect = action.payload
    },
  },
})

export const {
  setThanksValues,
  updateTypHeadlineValue,
  updateTypSubHeadlineValue,
  updateTypShareTwitterHandleValue,
  updateTypShareButtonTwitterValue,
  updateTypRedirectValue,
} = thanksValuesSlice.actions

export default thanksValuesSlice.reducer
