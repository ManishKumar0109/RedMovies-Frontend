import { Outlet, useLocation, useNavigate } from "react-router-dom"
import "./index.css"
import { Provider, useDispatch } from "react-redux"
import Store from "./reduxStore/Store"
import { useEffect, useState } from "react"
import { addInfo } from "./reduxStore/UserInfoSlice"

const fetchUser = async (setLoading, dispatch, navigate) => {
  try {
    const raw = await fetch(`${import.meta.env.VITE_DOMAIN}getUser`, {
      method: "GET",
      credentials: "include",
    })

    if (raw.status === 200) {
      const data = await raw.json()
      dispatch(addInfo(data.result))
      setLoading(false)
    } else {
      navigate("/authorization")
    }
  } catch (err) {
    navigate("/authorization")
  }
}

function InnerApp() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser(setLoading, dispatch, navigate)
  }, [String(location.pathname), dispatch, navigate])
  if (location.pathname === "/authorization") return <Outlet />

  return loading ? <div>Loading......</div> : <Outlet />
}

function App() {
  return (
    <Provider store={Store}>
      <div className="flex flex-col h-screen hide-scrollbar">
        <InnerApp />
      </div>
    </Provider>
  )
}

export default App
