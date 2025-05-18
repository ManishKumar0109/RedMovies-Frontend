import { createRoot } from "react-dom/client"
import "./index.css"
import React, { lazy, Suspense } from "react"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.jsx"
import Header from "./components/Header.jsx"
import NotFoundPage from "./components/NotFoundPage.jsx"
const Authentication = lazy(() => import("./components/Authentication.jsx"))
const MovieDetailPage = lazy(() =>
  import("./components/DetailPage/MovieDetailPage.jsx")
)
const SeriesDetailPage = lazy(() =>
  import("./components/DetailPage/SeriesDetailPage.jsx")
)
const SearchPage = lazy(() => import("./components/SearchPage.jsx"))
const CastInfo = lazy(() => import("./components/CastInfo.jsx"))
const ReviewPage = lazy(() => import("./components/ReviewPage.jsx"))
const MainPage = lazy(() => import("./components/MainPage.jsx"))
const ProfilePage = lazy(() => import("./components/ProfilePage.jsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "homepage",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "authorization",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Authentication />
          </Suspense>
        ),
      },
      {
        path: "castinfo/:castId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <CastInfo />
          </Suspense>
        ),
      },
      {
        path: "movieinfo/:movieId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <MovieDetailPage />
          </Suspense>
        ),
      },
      {
        path: "reviews/:mediaType/:mediaId/:mediaName",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ReviewPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "tvseriesinfo/:tvSeriesId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <SeriesDetailPage />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <ProfilePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <MainPage />
      </Suspense>
    ),
  },
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
