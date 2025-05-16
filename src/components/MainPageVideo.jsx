import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const key = `${import.meta.env.VITE_TMDB_KEY}`

const fetchYtUrl = async (movieId, setytId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: key,
    },
  }

  const response = await fetch(url, options)
  const data = await response.json()
  const trailer = data.results.find((video) => video.type === "Trailer")
  setytId(trailer.key)
}

const MainPageVideo = () => {
  const movieData = useSelector((state) => state.allMovieList)
  const [ytId, setytId] = useState(null)

  if (!movieData || !movieData.trendingMovies) {
    return <div>Loading456...</div>
  }
  useEffect(() => {
    fetchYtUrl(movieData.trendingMovies.results[0].id, setytId)
  }, [movieData.trendingMovies.results[0].id])

  if (!ytId) return <div>Loading Trailer...</div>
  return (
    <div className="relative z-0 bg-amber-800  lg:h-[85%] h-[50%] w-full overflow-hidden ">
      <div className="absolute bg-transparent lg:h-[100%]    lg:top-0 lg:left-8 h-[100%] w-full z-30 flex flex-row items-end pb-4  ps-2">
        <div className="bg-transparent lg:h-[75%]   lg:w-[22%] h-[65%] w-[50%] rounded-lg overflow-hidden  ">
          <img
            className="h-full w-full opacity-90"
            src={`https://image.tmdb.org/t/p/w500${movieData.trendingMovies.results[0].poster_path}`}
          />
        </div>
        <div className="w-[50%] overflow-hidden flex flex-col justify-center h-[65%] ml-4 lg:ml-8">
          <h1 className="lg:text-4xl text-2xl font-bold mb-4  lg:mt-3 text-white flex">
            {movieData.trendingMovies.results[0].title}
          </h1>
          <h3 className="text-lg lg:block hidden font-medium text-white mb-2">
            {movieData.trendingMovies.results[0].overview}
          </h3>
          <Link to={`/movieinfo/${movieData.trendingMovies.results[0].id}`}>
            <button className="relative text-white text-lg w-32 py-2 font-semibold border border-white/50 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:border-white hover:text-white transition duration-300 ease-in-out">
              More Info
            </button>
          </Link>
        </div>
      </div>
      <iframe
        className="h-full w-full lg:scale-x-[1.4] lg:scale-y-[1.4] scale-y-[2.65] scale-x-[2.2] "
        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&vq=hd1080`}
        autoplay="allow"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default MainPageVideo
