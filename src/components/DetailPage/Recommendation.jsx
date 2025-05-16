import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Card = ({ name, imageLink, id, type }) => {
  return (
    <Link to={type === "tv" ? `/tvseriesinfo/${id}` : `/movieinfo/${id}`}>
      <div
        onClick={() => {}}
        className="h-full lg:w-52 w-44 sm:w-40 flex-shrink-0 flex flex-col items-center rounded-xl overflow-hidden mr-4 bg-transparent"
      >
        <div className="h-3/4 w-full">
          <img
            className="h-full w-full object-cover rounded-xl"
            src={imageLink}
          />
        </div>
        <p className="font-bold text-xl sm:text-lg mt-2 text-center text-white">
          {name}
        </p>
      </div>
    </Link>
  )
}

const Recommendation = ({ type = "movie" }) => {
  const movies = useSelector((store) =>
    type === "tv"
      ? store.detailSeriesData.DetailSeriesRecommendation
      : store.detailMovieData.DetailMovieRecommendation
  )

  if (!movies) return <div>Loading456...</div>

  return (
    <div className="pt-7 lg:px-16 px-4 h-auto my-4 bg-transparent">
      <h1 className="text-white font-bold text-3xl mb-5">
        {type === "tv" ? "Recommended TV Shows" : "Recommended Movies"}
      </h1>
      <div className="flex h-96 w-full scrollbar-hide overflow-x-scroll rounded-xl hide-scrollbar">
        {movies.map((el) => {
          return (
            <Card
              name={el.original_title || el.original_name}
              type={type}
              imageLink={`https://image.tmdb.org/t/p/original/${el.poster_path}`}
              id={el.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Recommendation
