const key = `${import.meta.env.VITE_TMDB_KEY}`
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${key}`, // Ensure 'key' is defined before calling this function
  },
}

async function searchMovie() {
  const url =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1"

  const raw = await fetch(url, options)
  const data = await raw.json()
}

const useSearchMovie = () => {
  searchMovie()
}
