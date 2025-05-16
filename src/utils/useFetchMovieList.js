import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  trendingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
} from "../reduxStore/MainPageMovieListSlice"

const key = `${import.meta.env.VITE_TMDB_KEY}`
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: key,
  },
}

const fetchTrendingMovie = async (dispatch) => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
  const raw = await fetch(url, options)
  const data = await raw.json()
  dispatch(trendingMovies(data))
}

const fetchPopularMovie = async (dispatch) => {
  const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  const raw = await fetch(url, options)
  const data = await raw.json()
  dispatch(popularMovies(data))
}

const fetchTopRatedMovie = async (dispatch) => {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  const raw = await fetch(url, options)
  const data = await raw.json()
  dispatch(topRatedMovies(data))
}

const fetchUpcomingMovie = async (dispatch) => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
  const raw = await fetch(url, options)
  const data = await raw.json()
  dispatch(upcomingMovies(data))
}

const useFetchMovieList = () => {
  const dispatch = useDispatch()

  const { trending, popular, topRated, upcoming } = useSelector(
    (state) => state.allMovieList
  )

  // If data already exists, no need to fetch again
  if (trending && popular && topRated && upcoming) return

  useEffect(() => {
    fetchTrendingMovie(dispatch)
    fetchPopularMovie(dispatch)
    fetchTopRatedMovie(dispatch)
    fetchUpcomingMovie(dispatch)
  }, [dispatch])

  return
}

export default useFetchMovieList
