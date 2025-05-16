import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Avatars = import.meta.env.VITE_AVATAR

const Avatar = ({ name, emailId, password }) => {
  const AvatarOptionsSrc = Avatars.replace("[", "").replace("]", "").split(",")
  console.log(AvatarOptionsSrc)

  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const handleSelect = async (src) => {
    const avatarName = src
    setSelectedAvatar(src)
    setMessage("Creating your profile...")

    try {
      const res = await fetch(`${import.meta.env.VITE_DOMAIN}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          name,
          emailId,
          password,
          avatar: avatarName,
        }),
      })
      if (res.status === 201) {
        setMessage("successfully account created")
        alert("Successfully signed up")
        window.location.reload()
      } else if (res.status === 409) {
        setMessage("Account already exist")
        setTimeout(() => {
          navigate("/authorization")
        }, 2000)
      } else {
        setMessage("Invalid credentials")
      }
    } catch (err) {
      setMessage("Something went wrong!")
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-screen-xl flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Choose Your Avatar
        </h1>

        <div className="max-h-[70vh] overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4  scrollbar-thin scrollbar-thumb-red-700">
          {AvatarOptionsSrc.map((src, i) => (
            <img
              key={i}
              src={`/Avatar/${src}`}
              alt="avatar"
              className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover cursor-pointer border-4 transition-all duration-300
              ${
                selectedAvatar === src
                  ? "border-white scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              onClick={() => handleSelect(src)}
            />
          ))}
        </div>

        {message && <p className="text-lg text-gray-300 mt-2">{message}</p>}
      </div>
    </div>
  )
}

export default Avatar
