import { useState, useRef } from "react"
import { Link } from "react-router-dom"

const key = `${import.meta.env.VITE_TMDB_KEY}`

const SearchMovieResultBox = ({ data }) => {
  const {
    id,
    title,
    overview,
    popularity,
    poster_path,
    release_date,
    media_type,
  } = data

  return (
    <div className="min-h-72 w-full mb-12 flex lg:flex-row flex-col items-center">
      <div className="lg:w-1/4 w-3/4 h-[75%] mr-4 flex-shrink-0 px-5">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Movie Poster"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div>
        <Link to={`/movieinfo/${id}`} className="no-underline">
          <h1 className="text-white text-3xl font-bold my-2 hover:text-blue-600 cursor-pointer">
            {title}
          </h1>
        </Link>
        <p className="text-white text-xl leading-tight mb-6 ml-1">{overview}</p>
        <p className="text-white text-lg ml-1">Release Date: {release_date}</p>
        <p className="text-white text-lg ml-1">Average Rating: {popularity}</p>
        <p className="text-blue-300 text-lg ml-1">{media_type.toUpperCase()}</p>
      </div>
    </div>
  )
}

const SearchSeriesResultBox = ({ data }) => {
  const { id, name, overview, popularity, poster_path, first_air_date } = data

  return (
    <div className="min-h-72 w-full mb-12 flex lg:flex-row flex-col items-center">
      <div className="lg:w-1/4 w-3/4 h-[75%] mr-4 flex-shrink-0 px-5">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Series Poster"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div>
        <Link to={`/tvseriesinfo/${id}`} className="no-underline">
          <h1 className="text-white text-3xl font-bold my-2 hover:text-blue-600 cursor-pointer">
            {name}
          </h1>
        </Link>
        <p className="text-white text-xl leading-tight mb-6 ml-1">{overview}</p>
        <p className="text-white text-lg ml-1">
          Release Date: {first_air_date}
        </p>
        <p className="text-white text-lg ml-1">Average Rating: {popularity}</p>
        <p className="text-blue-300 text-lg ml-1">TV Show / Series</p>
      </div>
    </div>
  )
}

const SearchPersonResultBox = ({ data }) => {
  const { id, gender, name, profile_path, known_for_department } = data

  return (
    <div className="min-h-72 w-full mb-12 flex lg:flex-row flex-col items-center">
      <div className="lg:w-1/4 w-3/4 h-[75%] mr-4 flex-shrink-0 px-5">
        <img
          src={`https://image.tmdb.org/t/p/w500${profile_path}`}
          alt="Person"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div>
        <Link to={`/castinfo/${id}`} className="no-underline">
          <h1 className="text-white text-3xl font-bold my-2 hover:text-blue-600 cursor-pointer">
            {name}
          </h1>
        </Link>
        <p className="text-white text-xl leading-tight mb-2 ml-1">
          {known_for_department}
        </p>
        <p className="text-white text-lg ml-1">
          Gender: {gender === 2 ? "Male" : "Female"}
        </p>
      </div>
    </div>
  )
}

async function findMovies(Name, setsearchMovies) {
  let trimmedStr = Name.trim().replace(/\s+/g, " ")
  const url = `https://api.themoviedb.org/3/search/multi?query=${trimmedStr}&include_adult=false&language=en-US&page=1`

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: key,
    },
  }

  try {
    const raw = await fetch(url, options)
    const data = await raw.json()
    setsearchMovies(data.results)
  } catch (error) {}
}

const SearchPage = () => {
  const inputName = useRef(null)
  const [searchResults, setsearchResults] = useState(null)

  function searchMovie() {
    if (inputName.current && inputName.current.value) {
      findMovies(inputName.current.value, setsearchResults)
    }
  }

  return (
    <>
      <div className="relative z-0 h-screen w-screen overflow-hidden ">
        <div className="h-screen w-screen bg-gradient-to-r from-black to-red-950" />
      </div>
      <div className="flex flex-col  items-center bg-transparent rounded-md shadow-lg absolute w-5/6 top-[17%] lg:top-[15%] lg:w-1/2 lg:left-1/4 left-[10%] lg:grid lg:grid-cols-12 lg:gap-2 lg:p-4">
        <input
          ref={inputName}
          type="text"
          placeholder="Search..."
          className="w-[95%]  px-2 py-3 border text-white text-xl font-semibold border-gray-300 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 lg:col-span-9 lg:mb-auto lg:w-auto bg-black/65"
        />
        <button
          onClick={searchMovie}
          className="py-2 pl-0 pr-[6px] w-28 font-bold bg-blue-500 text-white text-xl rounded-md 
             hover:bg-red-500 active:bg-blue-600 active:scale-95 active:shadow-inner 
             transition-all duration-100 shadow-md 
             lg:col-span-3 lg:w-auto lg:text-2xl"
        >
          🔍 Search
        </button>
      </div>
      {searchResults && searchResults.length > 0 && (
        <div className="absolute z-20 h-[56%] lg:w-3/4 w-[94%] rounded-2xl px-3 pt-4 border-8 border-black border-opacity-70  lg:top-[30%] top-[35%] lg:left-[11%] left-[3%] overflow-y-auto bg-black bg-opacity-70">
          {searchResults.map((el) => {
            if (el.media_type === "movie" && el.poster_path)
              return <SearchMovieResultBox key={el.id} data={el} />
            if (el.media_type === "tv" && el.poster_path)
              return <SearchSeriesResultBox key={el.id} data={el} />
            if (el.media_type === "person" && el.profile_path)
              return <SearchPersonResultBox key={el.id} data={el} />
          })}
        </div>
      )}
    </>
  )
}

export default SearchPage
