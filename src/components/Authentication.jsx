import { useRef, useState } from "react"
import { signup, login } from "../utils/validator"
import Avatar from "./Avatar"
import { useNavigate } from "react-router-dom"

const Authentication = () => {
  const [toggle, settoggle] = useState(true) //first signup
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)
  const [errormsg, seterrormsg] = useState(null)
  const [AvatarPage, setAvatarPage] = useState(false)
  const navigate = useNavigate()

  async function submitDetail() {
    try {
      if (toggle) {
        if (
          signup(
            name?.current?.value,
            email?.current?.value,
            password?.current?.value
          )
        ) {
          setAvatarPage(true)
          return
        }
        seterrormsg("Invalid Credentials")
      } else {
        if (login(email?.current?.value, password?.current?.value)) {
          const login = await fetch(`${import.meta.env.VITE_DOMAIN}login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              emailId: email.current.value,
              password: password.current.value,
            }),
          })
          console.log(login)
          if (login.status === 201) {
            navigate("/homepage")
          } else {
            seterrormsg("Can not sign in now . pls try later")
          }
          return
        }
        seterrormsg("Invalid Credentials")
      }
    } catch (err) {
      seterrormsg
        ("Something went wrong!")
    }
  }

  if (AvatarPage) {
    return (
      <Avatar
        name={name?.current?.value}
        emailId={email?.current?.value}
        password={password?.current?.value}
      />
    )
  }

  return (
    <div className="bg-[url('/authbg.jpg')] flex-grow flex flex-col justify-center items-center ">
      <div className=" h-[60%] w-[95%] lg:w-[50%]  flex flex-col rounded-lg items-center justify-center bg-black/70">
        <p className="text-white  text-2xl mb-3">
          {toggle != true ? "Sign In" : "Sign Up"}
        </p>

        {toggle && (
          <input
            ref={name}
            type="name"
            className="focus:outline-none bg-slate-500/50 mb-6 text-xl p-2 px-4 w-4/5 text-neutral-50 "
            placeholder="Full Name"
          ></input>
        )}
        <input
          ref={email}
          type="email"
          className=" focus:outline-none bg-slate-500/50   mb-6 text-xl p-2 px-4 w-4/5 text-neutral-50"
          placeholder="Email Address"
        ></input>
        <input
          ref={password}
          type="password"
          className="focus:outline-none bg-slate-500/50 mb-6 text-xl p-2 px-4 w-4/5 text-neutral-50"
          placeholder="Password"
        ></input>
        {errormsg && <p className="text-red-400 text-md mb-3">{errormsg}</p>}
        <button
          className="text-white bg-red-600 h-10 w-32 text-xl mb-6 active:scale-95 active:bg-red-700 transition-transform duration-100 shadow-md active:shadow-inner rounded"
          onClick={() => submitDetail()}
        >
          {toggle !== true ? "Sign In" : "Sign Up"}
        </button>

        {toggle === true ? (
          <div className="flex">
            <p className="text-slate-400 mr-2 ">Already have an account ?</p>
            <p
              onClick={() => {
                settoggle(false), seterrormsg(null)
              }}
              className=" text-white cursor-pointer"
            >
              SIGN IN NOW
            </p>
          </div>
        ) : (
          <div className="flex">
            <p className="text-slate-400 mr-2 ">New to RedMovies ?</p>
            <p
              onClick={() => {
                settoggle(true), seterrormsg(null)
              }}
              className=" text-white cursor-pointer"
            >
              SIGN UP NOW
            </p>
          </div>
        )}
        <p className="text-slate-400  mb-4 ms-4 mr-2">
          We value your privacy. Your information is safe with us.
        </p>
      </div>
    </div>
  )
}

export default Authentication
