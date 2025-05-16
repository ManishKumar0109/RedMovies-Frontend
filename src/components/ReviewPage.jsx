import React, { useEffect, useRef, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${import.meta.env.VITE_TMDB_KEY}`,
  },
}

async function fetchTmdbReview(mediaType, mediaId, setReviews) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/reviews?language=en-US&page=1`

  try {
    const raw = await fetch(url, options)
    const data = await raw.json()
    const result = data.results || []

    const reviewList = result.map((el) => ({
      name: el.author,
      review: el.content,
      reviewId: el.id,
      userId: "tmdb-user",
      image: el.author_details.avatar_path
        ? `https://image.tmdb.org/t/p/w200${el.author_details.avatar_path}`
        : "https://via.placeholder.com/100",
      rating: el.author_details.rating ?? "No rating",
    }))

    setReviews(reviewList)
  } catch (error) {
    console.error("Error fetching TMDb reviews:", error)
  }
}

async function fetchDbReview(mediaType, mediaId, setReviews, userId) {
  try {
    const raw = await fetch(
      `${
        import.meta.env.VITE_DOMAIN
      }getReviews?mediaId=${mediaId}&mediaType=${mediaType}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    )

    const data = await raw.json()
    const result = data.result

    if (Array.isArray(result)) {
      const mappedReviews = result.map((item) => {
        return {
          userId: item.userId._id,
          name: item.userId.name,
          image: item.userId.avatar,
          rating: item.reviews[0]?.rating || 5,
          review: item.reviews[0]?.text || "",
        }
      })

      setReviews((prev) => [...prev, ...mappedReviews])
    }
  } catch (err) {
    console.error("Error fetching reviews:", err)
  }
}

async function uploadReviewToDb(review, rating, mediaId, mediaType, userId) {
  await fetch(`${import.meta.env.VITE_DOMAIN}addReview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ mediaId, mediaType, text: review, rating }),
  })
}

const Review = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { mediaType, mediaId, mediaName } = params
  if (!mediaType || !mediaId || !mediaName) {
    navigate("/homepage")
  }
  const media_name = mediaName
  const [Reviews, setReviews] = useState([])
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const chatview = useRef(null)

  const userInfo = useSelector((state) => state.userInfo)

  const name = userInfo.name
  const userId = userInfo.userId
  const currentUserId = userId
  const image = userInfo.avatar

  useEffect(() => {
    chatview.current?.scrollIntoView({ behavior: "smooth" })
  }, [review])

  useEffect(() => {
    fetchTmdbReview(mediaType, mediaId, setReviews)
    fetchDbReview(mediaType, mediaId, setReviews, userId)
  }, [mediaId])

  function submitReview() {
    if (review.length > 0) {
      const newReview = {
        userId: userId,
        name: name,
        review,
        rating,
        image: `/Avatar/${image}`,
      }
      uploadReviewToDb(review, rating, mediaId, mediaType, userId)
      setReviews((prevReviews) => [...prevReviews, newReview])
      setReview("")
      setRating(0)
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[url('/authbg.jpg')] bg-cover bg-center">
      <div className="bg-opacity-90 flex flex-col lg:h-[95%] w-[100%] h-[100%] lg:w-[70%] lg:rounded-xl overflow-hidden pb-4 shadow-lg bg-gradient-to-br from-black to-red-800">
        <div className="lg:h-[55px] h-[55px] w-full mb-2 flex relative bg-transparent">
          <Link
            to={
              mediaType === "movie"
                ? `/movieinfo/${mediaId}`
                : `/tvseriesinfo/${mediaId}`
            }
          >
            <div className="absolute lg:w-[10%] w-[20%] h-full bg-transparent cursor-pointer flex ml-6 items-center">
              <i className="fa-solid fa-hand-point-left text-gray-100 text-3xl"></i>
            </div>
          </Link>
          <div className="flex-grow h-full w-full text-white bg-transparent text-2xl text-center pt-2 font-semibold overflow-hidden">
            {media_name}
          </div>
        </div>

        <div className="flex-grow w-full overflow-y-auto p-4 space-y-4 bg-transparent">
          {Reviews &&
            Reviews.length > 0 &&
            Reviews.map((review, index) => (
              <div
                key={review.reviewId}
                className={`flex flex-col space-x-4 ${
                  review.userId === currentUserId
                    ? "items-end"
                    : "justify-start"
                } w-full`}
              >
                <div className="flex space-x-4 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] bg-gray-700 p-4 rounded-lg shadow-sm">
                  <img
                    src={review.image}
                    alt={"img"}
                    className="w-24 lg:w-18 h-18 rounded-full border-2 border-blue-500 object-cover"
                  />
                  <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%] flex-grow">
                    <h3 className="text-xl font-bold text-fuchsia-700 shadow-2xl shadow-blue-800 tracking-wide uppercase">
                      {review.name}
                    </h3>
                    {review.rating && (
                      <p className="text-yellow-400 text-sm font-medium mb-1">
                        Rating: {review.rating}/10
                      </p>
                    )}
                    <p className="text-gray-300 text-sm">{review.review}</p>
                  </div>
                </div>
              </div>
            ))}
          <div ref={chatview}></div>
        </div>

        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              onClick={() => setRating(i + 1)}
              className={`cursor-pointer text-2xl ${
                i < rating ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-white ml-2 text-sm">
            {rating > 0 ? `${rating}/10` : ""}
          </span>
        </div>

        <div className="border-white border-2 h-16 w-[95%] sm:w-[97%] lg:w-[90%] bg-black/30 rounded-xl flex items-center justify-center p-3 mt-2 ml-3 lg:ml-16">
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review/comment"
            className=" w-[80%] text-xl font-semibold text-white bg-transparent border-none focus:outline-none placeholder-gray-400"
          />
          <button
            className="text-white px-6 py-2 cursor-pointer bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={submitReview}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Review
