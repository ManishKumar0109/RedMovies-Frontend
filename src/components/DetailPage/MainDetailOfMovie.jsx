import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function convertMinutesToHours(minutes) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

const MainDetailOfMovie = () => {
  const matter = useSelector((store) => store.detailMovieData.DetailMovieInfo)
  if (!matter)
    return <p className="text-white text-center text-xl">Loading...</p>

  const {
    id,
    budget,
    revenue,
    poster_path: imageLink,
    title: title,
    runtime,
    overview,
    genres,
    vote_average: popularity,
  } = matter

  return (
    <div className="relative  w-screen lg:h-[80vh] lg:min-h-0 min-h-screen  bg-transparent text-white flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-12">
      <div className="w-full lg:w-1/3 h-[110%] flex justify-center lg:justify-start bg-transparent">
        <img
          className="w-60 sm:w-72 lg:w-[85%] rounded-lg shadow-xl h-full object-cover bg-transparent"
          src={imageLink}
          alt={`${title} Poster`}
        />
      </div>

      <div className="lg:w-2/3 flex flex-col mt-6 lg:mt-2 lg:ml-4">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center lg:text-left">
          {title}
        </h1>

        <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-300 text-lg mb-4">
          {genres.map((el, index) => (
            <span key={index} className="bg-gray-800 px-3 py-1 rounded-full">
              {el.name}
            </span>
          ))}
          <span className="bg-gray-800 px-3 py-1 rounded-full">
            {convertMinutesToHours(runtime)}
          </span>
        </div>

        <p className="text-gray-400 text-lg text-center lg:text-left italic">
          {overview}
        </p>

        <div className="flex justify-center lg:justify-start mt-6 space-x-4">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300">
            ❤️ <span>Like</span>
          </button>
          <Link to={`/reviews/movie/${id}/${title}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300">
              💬➕ <span>Add Review</span>
            </button>
          </Link>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-300">
            📥 <span>Save</span>
          </button>
        </div>

        <div className="mt-6 text-gray-300 text-lg">
          <p>
            ⭐ <span className="font-semibold">Rating:</span> {popularity}
          </p>
          <p>
            💰 <span className="font-semibold">Budget:</span> $
            {budget.toLocaleString()}
          </p>
          <p>
            🎟️ <span className="font-semibold">Revenue:</span> $
            {revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainDetailOfMovie
