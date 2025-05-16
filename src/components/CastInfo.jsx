import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_TMDB_KEY}`,
  },
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

function ToggleButtons({ active, setActive }) {
  return (
    <div className="flex justify-center items-center bg-transparent h-32 py-7 px-10">
      <div className="h-full lg:w-1/3 w-[86%] flex rounded-full border-2 border-gray-600 overflow-hidden relative">
        <div
          className={`absolute top-0 bottom-0 w-1/2 bg-gray-900 bg-opacity-30 backdrop-blur-md transition-all duration-300 rounded-full ${
            active === "movies" ? "left-0" : "left-1/2"
          }`}
        ></div>
        <button
          className={`relative z-10 h-full w-1/2 text-lg font-semibold transition-all duration-200 ${
            active === "movies"
              ? "text-teal-300 font-bold"
              : "text-gray-400 hover:text-teal-200"
          }`}
          onClick={() => setActive("movies")}
        >
          Movies
        </button>
        <button
          className={`relative z-10 h-full w-1/2 text-lg font-semibold transition-all duration-200 ${
            active === "series"
              ? "text-indigo-300 font-bold"
              : "text-gray-400 hover:text-indigo-200"
          }`}
          onClick={() => setActive("series")}
        >
          TV Shows/Series
        </button>
      </div>
    </div>
  )
}

async function fetchCreditData(id, setMovieList, setSeriesList) {
  const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`
  const raw = await fetch(url, options)
  const data = await raw.json()
  const result = data.cast || []

  const movieList = result
    .filter((el) => el.media_type === "movie" && el.poster_path)
    .map(({ title, poster_path, id }) => ({ title, poster_path, id }))

  const seriesList = result
    .filter((el) => el.media_type === "tv" && el.poster_path)
    .map(({ name, poster_path, id }) => ({ name, poster_path, id }))

  const uniquemovieList = [...new Set(movieList)]
  const uniqueseriesList = [...new Set(seriesList)]
  setMovieList(uniquemovieList)
  setSeriesList(uniqueseriesList)
}

async function fetchPersonData(id, setPersonData) {
  const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`
  const raw = await fetch(url, options)
  const data = await raw.json()
  setPersonData(data)
}

const CastInfo = () => {
  const param = useParams()
  const { castId } = param
  const id = castId

  const [personData, setPersonData] = useState(null)
  const [active, setActive] = useState("movies")
  const [movieList, setMovieList] = useState([])
  const [seriesList, setSeriesList] = useState([])

  useEffect(() => {
    fetchCreditData(id, setMovieList, setSeriesList)
    fetchPersonData(id, setPersonData)
  }, [id])

  if (!personData) {
    return <div className="text-white text-center py-10">LoadingCast...</div>
  }

  return (
    <div className="flex-grow bg-transparent bg-gradient-to-br from-black to-red-900 ">
      <div className="bg-transparent flex flex-col lg:flex-row lg:px-[5%] px-0 py-10">
        <div className="bg-transparent w-full lg:w-1/3 px-12 py-5 lg:px-10 lg:py-16 rounded-2xl overflow-hidden">
          <img
            src={
              personData.profile_path
                ? IMAGE_BASE_URL + personData.profile_path
                : "/admindp.webp"
            }
            className="w-full h-auto object-cover rounded-2xl"
            alt={personData.name}
          />
        </div>
        <div className="bg-transparent w-full lg:w-2/3 flex flex-col lg:mt-2 lg:ml-4 lg:pt-16 px-5">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
            {personData.name || "Unknown Name"}
          </h1>
          <p className="text-gray-400 text-lg italic max-h-[38%] overflow-hidden">
            {personData.biography || "No biography available."}
          </p>
          <div className="mt-6 text-gray-300 text-lg">
            <p>
              🎂 <span className="font-semibold">Birthday:</span>{" "}
              {personData.birthday || "N/A"}
            </p>
            <p>
              🎂 <span className="font-semibold">Known for:</span>{" "}
              {personData.known_for_department || "N/A"}
            </p>
            {personData.deathday && (
              <p>
                🕊️ <span className="font-semibold">Deathday:</span>{" "}
                {personData.deathday}
              </p>
            )}
            <p>
              📍 <span className="font-semibold">Place of Birth:</span>{" "}
              {personData.place_of_birth || "Unknown"}
            </p>
            <p>
              🎭 <span className="font-semibold">IMDB:</span>{" "}
              <a
                href={`https://www.imdb.com/name/${personData.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                View Profile
              </a>
            </p>
            <p>
              🎭 <span className="font-semibold">Detailed Info</span>{" "}
              <a
                href={`https://en.wikipedia.org/wiki/${personData.name.replace(
                  " ",
                  "_"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400"
              >
                More Info
              </a>
            </p>
          </div>
        </div>
      </div>

      <ToggleButtons active={active} setActive={setActive} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-3 sm:p-5">
        {(active === "movies" ? movieList : seriesList).map((item, index) => (
          <Link
            to={
              active === "movies"
                ? `/movieinfo/${item.id}`
                : `/tvseriesinfo/${item.id}`
            }
          >
            <div
              key={index}
              className="bg-gray-900 p-3 sm:p-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-48 sm:h-72 overflow-hidden rounded-xl">
                <img
                  src={IMAGE_BASE_URL + item.poster_path}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <p className="text-white text-center font-semibold text-sm sm:text-lg">
                    {item.title || item.name}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CastInfo
