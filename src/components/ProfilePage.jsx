import { useState } from "react"
import { useSelector } from "react-redux"
import { updateProfile as validateProfile } from "../utils/validator"

const Avatars = import.meta.env.VITE_AVATAR

const ProfilePage = () => {
  const AvatarOptionsSrc = Avatars.replace("[", "").replace("]", "").split(",")
  console.log(AvatarOptionsSrc)
  const userInfo = useSelector((state) => state.userInfo)

  if (!userInfo) {
    return <div>Loading...</div>
  }

  const [name, setName] = useState(userInfo.name.toUpperCase())
  const [avatar, setAvatar] = useState(null)
  const [openAvatarMenu, setopenAvatarMenu] = useState("hidden")
  const [emailId, setEmailId] = useState(userInfo.emailId)

  async function updateProfile(emailId, name, avatar) {
    if (avatar === null) {
      avatar = userInfo.avatar
    }
    if (!validateProfile(name, emailId, avatar)) {
      return
    }
    try {
      await fetch(`${import.meta.env.VITE_DOMAIN}updateUser`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailId, name, avatar }),
      })
    } catch (err) {
      // Handle error silently or with UI feedback if needed
    }
  }

  return (
    <div className="h-full w-full flex justify-center bg-gradient-to-r from-black to-red-950 relative z-0">
      <div
        className={`w-full max-w-screen-xl flex flex-col items-center ${openAvatarMenu} absolute z-20 bg-gradient-to-r from-black to-red-950 scale-[1.2] lg:h-full`}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Choose Your Avatar
        </h1>

        <div className="max-h-[70vh] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 scrollbar-thin scrollbar-thumb-red-700">
          {AvatarOptionsSrc.map((src, i) => (
            <img
              key={i}
              src={`/Avatar/${src}`}
              alt="avatar"
              className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover cursor-pointer border-4 transition-all duration-300
              ${
                avatar === src
                  ? "border-white scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              onClick={() => {
                setAvatar(src)
                setopenAvatarMenu("hidden")
              }}
            />
          ))}
        </div>
      </div>

      <div className="lg:w-[30%] w-full bg-transparent h-full lg:mr-28 flex flex-col items-center justify-evenly py-6 shadow-red-500 shadow-2xl">
        <div className="aspect-square w-[45%] lg:w-[36%] bg-white rounded-full relative overflow-hidden">
          <img
            src={avatar ? `/Avatar/${avatar}` : `/Avatar/${userInfo.avatar}`}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
          <i
            className="fa-solid fa-pencil absolute bottom-5 right-7 bg-black/70 px-3 py-3 rounded-full z-10 text-white"
            onClick={() => setopenAvatarMenu("block")}
          ></i>
        </div>

        <div className="h-[73%]bg-transparent w-full flex flex-col py-3 items-center">
          <input
            className="h-[14%] bg-gray-600 my-8 text-xl text-white px-4 py-2 rounded-full text-center"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[14%] bg-gray-600 text-xl text-white px-4 py-2 rounded-full text-center"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <button
            onClick={() => updateProfile(emailId, name, avatar)}
            className="text-white h-[15%] bg-gray-600 px-4 py-2 rounded-full mt-16"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
