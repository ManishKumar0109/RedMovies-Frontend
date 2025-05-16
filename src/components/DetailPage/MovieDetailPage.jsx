import Header from "../Header"
import MainDetailOfMovie from "./MainDetailOfMovie"
import Cast from "./Cast"
import Media from "./Media"
import Recommendation from "./Recommendation"
import { useNavigate, useParams } from "react-router-dom"
import useSetDetailMoviePage from "../../utils/useSetDetailMoviePage"
import { useEffect } from "react"
import { removeDetailOfMovie } from "../../reduxStore/DetailedPageMovie"
import { useDispatch } from "react-redux"

const MovieDetailPage = () => {
  const param = useParams()
  const { movieId } = param
  const id = movieId
  const dispatch = useDispatch()

  useSetDetailMoviePage(id)

  useEffect(() => {
    console.log("Component mounted")

    return () => {
      console.log("Component unmounted")
      dispatch(removeDetailOfMovie)
    }
  }, [id]) // Empty dependency array ensures it runs only on mount/unmount

  return (
    <div className="flex-grow bg-gradient-to-r from-black to-red-950 scrollbar-hide">
      <MainDetailOfMovie />
      <Cast />
      <Media />
      <Recommendation />
    </div>
  )
}

export default MovieDetailPage
