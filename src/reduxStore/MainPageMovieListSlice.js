import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  trendingMovies: null,
  popularMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
}

const MainPageMovieListSlice = createSlice({
  name: "allMovieList",
  initialState,
  reducers: {
    trendingMovies: (state, action) => {
      state.trendingMovies = action.payload // ✅ Directly update the state
    },
    popularMovies: (state, action) => {
      state.popularMovies = action.payload // ✅ Fixed
    },
    topRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload // ✅ Fixed
    },
    upcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload // ✅ Fixed
    },
  },
})

export const { trendingMovies, popularMovies, topRatedMovies, upcomingMovies } =
  MainPageMovieListSlice.actions

export default MainPageMovieListSlice.reducer
