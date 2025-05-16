import { Link, useLocation, useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { useRef } from "react"
import { useSelector } from "react-redux"

const Header = ({ customStyle = "bg-gradient-to-r from-black to-red-950" }) => {
  const [Navbar, setNavbar] = useState("hidden")
  const navigate = useNavigate()
  const location = useLocation()
  const ref = useRef(null)

  function showNavbar() {
    setNavbar(Navbar === "hidden" ? "block" : "hidden")
    setTimeout(() => {
      setNavbar("hidden")
    }, 5000)
  }

  const name = useSelector((store) => store.userInfo.name)

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }, [location.pathname, navigate])

  async function logout(navigate) {
    console.log("function called")
    const raw = await fetch(`${import.meta.env.VITE_DOMAIN}logout`, {
      method: "POST",
      credentials: "include",
    })
    window.location.href = "/authorization" // goes to homepage with full reload
  }

  return (
    <div
      ref={ref}
      className={`${customStyle}  min-h-[11%] max-h-[12%] flex flex-row justify-between items-center  z-10 w-full shadow-md shadow-red-600 relative `}
    >
      <img
        className="bg-transparent h-[80%] ml-3 lg:ml-5"
        src="/logo.png"
        alt="logo"
      />
      <nav className="hidden space-x-6 text-white text-lg font-semibold uppercase tracking-wide lg:block ">
        <Link
          to="/homepage"
          className="relative hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-400 after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Home
        </Link>
        <Link
          to="/search"
          className="relative hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-400 after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Search
        </Link>
        <Link
          to="/profile"
          className="relative hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-400 after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Profile
        </Link>
        <Link
          to="/authorization"
          onClick={() => logout(navigate)}
          className="relative hover:text-red-400 transition-all duration-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-400 after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          Logout
        </Link>
      </nav>
      <div
        onClick={() => {
          setNavbar("hidden")
        }}
        className={`lg:hidden absolute ${Navbar} top-full left-[15%] z-[999] h-[300%] w-[70%] bg-black/90 border-x-4 border-y-2 border-white flex flex-col items-center justify-evenly px-4  text-white rounded-3xl`}
      >
        <Link
          to="/homepage"
          className="flex justify-center items-center border-b-2 border-b-white w-full tracking-wider text-xl pb-2  "
        >
          Home
        </Link>
        <Link
          to="/search"
          className="flex justify-center items-center border-b-2 border-b-white w-full tracking-wider text-xl pb-2 "
        >
          Search
        </Link>
        <Link
          to="/profile"
          className="flex justify-center items-center border-b-2 border-b-white w-full tracking-wider text-xl pb-2 pt-1 "
        >
          Profile
        </Link>
        <Link
          to="/authorization"
          onClick={() => logout(navigate)}
          className="flex justify-center items-center border-b-2 border-b-white w-full tracking-wider text-xl pb-2 "
        >
          Logout
        </Link>
        <div>
          <i className="fa-solid fa-xmark text-2xl cursor-pointer hover:text-red-400 transition-colors duration-300"></i>
        </div>
      </div>

      <div
        className="text-white lg:text-2xl text-2xl lg:mr-20 mr-4 font-bold border-2 border-amber-700 px-3 rounded-full bg-amber-800 py-1 "
        onClick={() => {
          showNavbar()
        }}
      >
        {name ? name.toUpperCase() : "User"}
      </div>
    </div>
  )
}

export default Header
