import Header from "../Header"
import MainDetailOfSeries from "./MainDetailOfSeries"
import Cast from "./Cast"
import Media from "./Media"
import Recommendation from "./Recommendation"
import { useNavigate, useParams } from "react-router-dom"
import useSetDetailSeriesPage from "../../utils/useSetDetailSeriesPage"
import { removeDetailOfSeries } from "../../reduxStore/DetailedPageSeries"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const SeriesDetailPage = () => {
  const param = useParams()
  const { tvSeriesId } = param
  const id = tvSeriesId
  useSetDetailSeriesPage(id)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(removeDetailOfSeries)
    }
  }, [id])

  return (
    <div className="flex-grow bg-gradient-to-r from-black to-red-950 scrollbar-hide">
      <MainDetailOfSeries />
      <Cast type={"tv"} />
      <Media type={"tv"} />
      <Recommendation type={"tv"} />
    </div>
  )
}

export default SeriesDetailPage
