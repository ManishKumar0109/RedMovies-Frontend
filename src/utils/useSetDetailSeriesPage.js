import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  saveDetailSeriesCast,
  saveDetailSeriesInfo,
  saveDetailSeriesVideoKey,
  saveDetailSeriesImage,
  saveDetailSeriesRecommendation,
} from "../reduxStore/DetailedPageSeries"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_TMDB_KEY}`,
  },
}

const useSetDetailSeriesPage = (id) => {
  const MasterUrl = "https://api.themoviedb.org/3/tv/"
  let detailUrl = `${MasterUrl}${id}`
  let creditUrl = `${MasterUrl}${id}/credits`
  let imageUrl = `${MasterUrl}${id}/images`
  let videoUrl = `${MasterUrl}${id}/videos`
  let similarSeriesUrl = `${MasterUrl}${id}/similar`

  const dispatch = useDispatch()

  const fetchDetail = async () => {
    const rawData = await fetch(detailUrl, options)
    const detailData = await rawData.json()

    const detailInfo = {
      id: detailData.id,
      original_language: detailData.original_language,
      genres: detailData.genres,
      status: detailData.status,
      original_name: detailData.original_name,
      name: detailData.name,
      overview: detailData.overview,
      popularity: detailData.popularity,
      poster_path: detailData.poster_path
        ? `https://image.tmdb.org/t/p/original/${detailData.poster_path}`
        : null,
      first_air_date: detailData.first_air_date,
      last_air_date: detailData.last_air_date,
      number_of_seasons: detailData.number_of_seasons,
      number_of_episodes: detailData.number_of_episodes,
      vote_average: detailData.vote_average,
      vote_count: detailData.vote_count,
      tagline: detailData.tagline,
      in_production: detailData.in_production,
      episode_run_time: detailData.episode_run_time?.[0] || null, // Some shows have multiple runtimes
      networks: detailData.networks?.map((net) => net.name) || [],
      production_companies:
        detailData.production_companies?.map((pc) => pc.name) || [],
      spoken_languages:
        detailData.spoken_languages?.map((lang) => lang.english_name) || [],
      homepage: detailData.homepage || "",
    }

    dispatch(saveDetailSeriesInfo(detailInfo))
  }

  const fetchCast = async () => {
    const rawData = await fetch(creditUrl, options)
    const creditData = await rawData.json()
    const { cast } = creditData
    const castList = cast.map((el) => {
      const { original_name, profile_path, character, id, name } = el
      return {
        original_name,
        profile_path: `https://image.tmdb.org/t/p/original/${profile_path}`,
        character,
        id,
        name,
      }
    })
    dispatch(saveDetailSeriesCast(castList))
  }

  const fetchImage = async () => {
    const rawData = await fetch(imageUrl, options)
    const imageData = await rawData.json()
    const { backdrops } = imageData
    const imageLinks = backdrops.map((el) => {
      const { file_path } = el
      return `https://image.tmdb.org/t/p/original/${file_path}`
    })
    dispatch(saveDetailSeriesImage(imageLinks))
  }

  const fetchVideo = async () => {
    const rawData = await fetch(videoUrl, options)
    const videoData = await rawData.json()
    const { results } = videoData
    const videoKeyS = results
      .filter((el) => el.type === "Trailer")
      .map((el) => el.key)
    const videoKey = videoKeyS[0]
    dispatch(saveDetailSeriesVideoKey(videoKey))
  }

  const fetchSimilar = async () => {
    const rawData = await fetch(similarSeriesUrl, options)
    const Data = await rawData.json()

    dispatch(saveDetailSeriesRecommendation(Data.results))
  }

  useEffect(() => {
    fetchCast()
    fetchDetail()
    fetchImage()
    fetchVideo()
    fetchSimilar()
  }, [id])
}

export default useSetDetailSeriesPage
