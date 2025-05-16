import { configureStore } from "@reduxjs/toolkit"
import userInfoReducer from "./UserInfoSlice"
import MainPageMovieListReducer from "./MainPageMovieListSlice"
import detailedPageMovieReducer from "./DetailedPageMovie"
import detailedPageSeriesReducer from "./DetailedPageSeries" // Ensure reducer import

const Store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    allMovieList: MainPageMovieListReducer,
    detailMovieData: detailedPageMovieReducer, // Fix import
    detailSeriesData: detailedPageSeriesReducer, // Fix import
  },
})

export default Store
