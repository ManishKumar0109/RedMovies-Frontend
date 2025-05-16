import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const MovieCard = ({ el }) => {
  const { poster_path, id, title } = el
  return (
    <Link to={`/movieinfo/${id}`}>
      <div className="w-48 min-w-[192px] p-2 cursor-pointer transition-transform transform hover:scale-105">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <p className="text-lg text-center mt-2 font-semibold text-white overflow-hidden">
          {title}
        </p>
      </div>
    </Link>
  )
}

export { MovieCard }

const MainPageMovieLists = () => {
  const movieData = useSelector((state) => state.allMovieList)
  const { trendingMovies, popularMovies, topRatedMovies, upcomingMovies } =
    movieData

  if (!trendingMovies || !popularMovies || !topRatedMovies || !upcomingMovies) {
    return <div>Loading456...</div>
  }
  console.log(trendingMovies)
  return (
    <div className="bg-gradient-to-r from-black to-red-800 flex-grow flex flex-col justify-evenly">
      <div className="mx-8 mt-6">
        <h1 className="text-white text-2xl mb-4">Trending Movies</h1>
        <div className="flex flex-row justify-evenly overflow-x-scroll overflow-y-hidden hide-scrollbar">
          {trendingMovies.results.map((el) => (
            <MovieCard el={el} />
          ))}
        </div>
      </div>
      <div className="mx-8 mt-6">
        <h1 className="text-white text-2xl mb-4 ">Popular Movies</h1>

        <div className="flex flex-row justify-evenly overflow-x-scroll overflow-y-hidden hide-scrollbar">
          {popularMovies.results.map((el) => (
            <MovieCard el={el} />
          ))}
        </div>
      </div>
      <div className="mx-8 mt-6">
        <h1 className="text-white text-2xl mb-4 ">Top Rated Movies</h1>
        <div className="flex flex-row justify-evenly overflow-x-scroll overflow-y-hidden hide-scrollbar">
          {topRatedMovies.results.map((el) => (
            <MovieCard el={el} />
          ))}
        </div>
      </div>
      <div className="mx-8 mt-6">
        <h1 className="text-white text-2xl mb-4 ">Upcoming Movies</h1>
        <div className="flex flex-row justify-evenly overflow-x-scroll overflow-y-hidden hide-scrollbar">
          {upcomingMovies.results.map((el) => (
            <MovieCard el={el} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPageMovieLists
