import MainPageVideo from "./MainPageVideo"
import MainPageMovieLists from "./MainPageMovieLists"

import { useSelector } from "react-redux"
import useFetchMovieList from "../utils/useFetchMovieList"

const MainPage = () => {
  console.log("home page")
  useFetchMovieList()

  const movieData = useSelector((state) => state.allMovieList)
  if (!movieData || !movieData.trendingMovies) {
    return <div>Loading123...</div>
  }
  return (
    <div className="h-full w-full hide-scrollbar">
      <MainPageVideo />
      <MainPageMovieLists />
    </div>
  )
}

export default MainPage
