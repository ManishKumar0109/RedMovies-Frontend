import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  saveDetailMovieCast,
  saveDetailMovieInfo,
  saveDetailMovieVideoKey,
  saveDetailMovieImage,
  saveDetailMovieRecommendation,
} from "../reduxStore/DetailedPageMovie"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_TMDB_KEY}`,
  },
}

const useSetDetailMoviePage = (id) => {
  const MasterUrl = "https://api.themoviedb.org/3/movie/"
  let detailUrl = `${MasterUrl}${id}`
  let creditUrl = `${MasterUrl}${id}/credits`
  let imageUrl = `${MasterUrl}${id}/images`
  let videoUrl = `${MasterUrl}${id}/videos`
  let similarMovieUrl = `${MasterUrl}${id}/similar`

  const dispatch = useDispatch()

  ///////////////////////////////////////////////////////////////////

  const fetchDetail = async () => {
    const rawData = await fetch(detailUrl, options)
    const detailData = await rawData.json()
    const detailInfo = {
      id: detailData.id,
      original_language: detailData.original_language,
      budget: detailData.budget,
      genres: detailData.genres,
      revenue: detailData.revenue,
      runtime: detailData.runtime,
      status: detailData.status,
      original_title: detailData.original_title,
      overview: detailData.overview,
      popularity: detailData.popularity,
      poster_path: `https://image.tmdb.org/t/p/original/${detailData.poster_path}`,
      release_date: detailData.release_date,
      title: detailData.title,
      video: detailData.video,
      vote_average: detailData.vote_average,
      vote_count: detailData.vote_count,
    }
    dispatch(saveDetailMovieInfo(detailInfo))
  }

  ///////////////////////////////////////////////////////////////////
  const fetchCast = async () => {
    const rawData = await fetch(creditUrl, options)
    const creditData = await rawData.json()
    const { cast } = creditData
    const castList = cast.map((el) => {
      const { original_name, profile_path, character, id } = el
      return {
        original_name,
        profile_path: `https://image.tmdb.org/t/p/original/${profile_path}`,
        character,
        id,
      }
    })
    dispatch(saveDetailMovieCast(castList))
  }

  ////////////////////////////////////////////////////////////////////
  const fetchImage = async () => {
    const rawData = await fetch(imageUrl, options)
    const imageData = await rawData.json()
    const { backdrops } = imageData
    const imageLinks = backdrops.map((el) => {
      const { file_path } = el
      return `https://image.tmdb.org/t/p/original/${file_path}`
    })
    dispatch(saveDetailMovieImage(imageLinks))
  }

  ///////////////////////////////////////////////////////////////////
  const fetchVideo = async () => {
    const rawData = await fetch(videoUrl, options)
    const videoData = await rawData.json()
    const { results } = videoData
    const videoKeyS = results
      .filter((el) => el.type === "Trailer")
      .map((el) => el.key)
    const videoKey = videoKeyS[0]
    dispatch(saveDetailMovieVideoKey(videoKey))
  }

  const fetchSimilar = async () => {
    const rawData = await fetch(similarMovieUrl, options)
    const Data = await rawData.json()

    dispatch(saveDetailMovieRecommendation(Data.results))
  }

  useEffect(() => {
    fetchCast()
    fetchDetail()
    fetchImage()
    fetchVideo()
    fetchSimilar()
  }, [id])
}

export default useSetDetailMoviePage
