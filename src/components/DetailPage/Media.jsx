import { useSelector } from "react-redux"
import { useState } from "react"

const VideoMedia = ({ videoKey }) => {
  console.log("this is the answer", videoKey)
  return (
    <div className="h-full w-full lg:w-1/2 lg:p-5 pl-2 mb-5">
      <iframe
        className="w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoKey}?si=Bqvds1JSgyvPDnkQ`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

const ImageMedia = ({ Images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const length = Images.length

  const changeImage = (direction) => {
    setIsFading(true)
    setTimeout(() => {
      setImageIndex((prevIndex) =>
        direction === "next"
          ? (prevIndex + 1) % length
          : (prevIndex - 1 + length) % length
      )
      setIsFading(false)
    }, 600)
  }

  return (
    <div className="relative h-full w-full lg:w-1/2 rounded-xl overflow-hidden flex items-center justify-center">
      <img
        className={`h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        src={Images[imageIndex] || "https://via.placeholder.com/500"}
        alt="Movie Scene"
        loading="lazy"
      />
      <button
        className="absolute left-2 bg-black/80 cursor-pointer p-2 rounded-full text-white text-2xl hover:bg-opacity-80 transition"
        onClick={() => changeImage("prev")}
        aria-label="Previous Image"
      >
        <i className="fa-solid fa-backward-step h-full w-full"></i>
      </button>
      <button
        className="absolute right-2 bg-black/80 p-2 cursor-pointer rounded-full text-white text-2xl hover:bg-opacity-80 transition"
        onClick={() => changeImage("next")}
        aria-label="Next Image"
      >
        <i className="fa-solid fa-forward-step h-full w-full"></i>
      </button>
    </div>
  )
}

const Media = ({ type = "movie" }) => {
  const MediaData = useSelector((store) => ({
    videoKey:
      type === "tv"
        ? store.detailSeriesData.DetailSeriesVideoKey
        : store.detailMovieData.DetailMovieVideoKey,
    Images:
      type === "tv"
        ? store.detailSeriesData.DetailSeriesImage
        : store.detailMovieData.DetailMovieImage,
  }))

  if (!MediaData.videoKey || !MediaData.Images) return null

  return (
    <div className="h-[70vh] pt-7 px-6 sm:px-10 lg:px-16 bg-transparent flex flex-col my-4">
      <h1 className="text-white font-bold text-3xl sm:text-4xl ml-1 mb-2">
        Media
      </h1>
      <div className="flex flex-col lg:flex-row flex-grow w-full">
        <VideoMedia videoKey={MediaData.videoKey} />
        <ImageMedia Images={MediaData.Images} />
      </div>
    </div>
  )
}

export default Media
