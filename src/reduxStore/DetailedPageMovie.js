import { createSlice } from "@reduxjs/toolkit"
const detailMovieDataSlice = createSlice({
  name: "detailMovieData",
  initialState: {
    DetailMovieInfo: null,
    DetailMovieImage: null,
    DetailMovieVideoKey: null,
    DetailMovieCast: null,
    DetailMovieRecommendation: null,
  },
  reducers: {
    saveDetailMovieInfo: (state, action) => {
      state.DetailMovieInfo = action.payload
    },
    saveDetailMovieImage: (state, action) => {
      state.DetailMovieImage = action.payload
    },
    saveDetailMovieVideoKey: (state, action) => {
      state.DetailMovieVideoKey = action.payload
    },
    saveDetailMovieCast: (state, action) => {
      state.DetailMovieCast = action.payload
    },
    saveDetailMovieRecommendation: (state, action) => {
      state.DetailMovieRecommendation = action.payload
    },
    removeDetailOfMovie: (state) => {
      state.DetailMovieCast = null
      state.DetailMovieImage = null
      state.DetailMovieInfo = null
      state.DetailMovieRecommendation = null
      state.DetailMovieVideoKey = null
    },
  },
})

export const {
  saveDetailMovieCast,
  saveDetailMovieImage,
  saveDetailMovieInfo,
  saveDetailMovieRecommendation,
  saveDetailMovieVideoKey,
  removeDetailOfMovie,
} = detailMovieDataSlice.actions
export default detailMovieDataSlice.reducer
