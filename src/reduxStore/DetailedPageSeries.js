import { createSlice } from "@reduxjs/toolkit"
const detailSeriesDataSlice = createSlice({
  name: "detailSeriesData",
  initialState: {
    DetailSeriesInfo: null,
    DetailSeriesImage: null,
    DetailSeriesVideoKey: null,
    DetailSeriesCast: null,
    DetailSeriesRecommendation: null,
  },
  reducers: {
    saveDetailSeriesInfo: (state, action) => {
      state.DetailSeriesInfo = action.payload
    },
    saveDetailSeriesImage: (state, action) => {
      state.DetailSeriesImage = action.payload
    },
    saveDetailSeriesVideoKey: (state, action) => {
      state.DetailSeriesVideoKey = action.payload
    },
    saveDetailSeriesCast: (state, action) => {
      state.DetailSeriesCast = action.payload
    },
    saveDetailSeriesRecommendation: (state, action) => {
      state.DetailSeriesRecommendation = action.payload
    },

    removeDetailOfSeries: (state) => {
      state.DetailSeriesInfo = null
      state.DetailSeriesImage = null
      state.DetailSeriesVideoKey = null
      state.DetailSeriesCast = null
      state.DetailSeriesRecommendation = null
    },
  },
})

export default detailSeriesDataSlice.reducer
export const {
  saveDetailSeriesInfo,
  saveDetailSeriesImage,
  saveDetailSeriesVideoKey,
  saveDetailSeriesCast,
  saveDetailSeriesRecommendation,
  removeDetailOfSeries,
} = detailSeriesDataSlice.actions
