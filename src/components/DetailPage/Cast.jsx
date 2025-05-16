import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Card = ({ name, imageLink, character, id }) => {
  return (
    <Link to={`/castinfo/${id}`}>
      <div className="h-full lg:w-52 w-44 pb-2 sm:w-40 flex-shrink-0 flex flex-col items-center rounded-xl overflow-hidden mr-4 ">
        <div className="h-[85%] w-full">
          <img
            className="h-full w-full object-cover rounded-xl"
            src={imageLink}
            alt={name}
          />
        </div>
        <p className="font-bold text-xl sm:text-lg mt-1 text-center text-white">
          {name}
        </p>
        <p className="text-center text-sm sm:text-xs  text-white">
          {character}
        </p>
      </div>
    </Link>
  )
}

const Cast = ({ type = "movie" }) => {
  const castList = useSelector((store) =>
    type === "tv"
      ? store.detailSeriesData.DetailSeriesCast
      : store.detailMovieData.DetailMovieCast
  )

  if (!castList || castList.length === 0) {
    return (
      <p className="text-white text-center">No cast information available.</p>
    )
  }

  return (
    <div className="pt-7 lg:px-16 px-4 h-auto bg-transparent my-4">
      <h1 className="text-white font-bold text-3xl mb-4">Top Billed Cast</h1>
      <div className="flex h-80 w-full scrollbar-hide overflow-x-scroll rounded-xl hide-scrollbar">
        {castList.map((el, index) => (
          <Card
            key={index} // Always use a unique key
            name={el.name}
            imageLink={el.profile_path}
            character={el.character}
            id={el.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Cast
