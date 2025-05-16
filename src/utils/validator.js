import validator from "validator"

const AvatarOptionsSrc = import.meta.env.VITE_AVATAR

function login(email, password) {
  if (!validator.isEmail(email) || !validator.isStrongPassword(password)) {
    return false
  }
  return true // ✅ Return true when valid
}

function signup(name, email, password) {
  if (
    !validator.isEmail(email) ||
    !validator.isStrongPassword(password) ||
    !validator.isAlpha(name, "en-US", { ignore: " " }) // ✅ Allows spaces
  ) {
    return false
  }
  return true // ✅ Return true when valid
}

function updateProfile(name, email, avatar) {
  if (
    !validator.isEmail(email) ||
    !validator.isAlpha(name, "en-US", { ignore: " " }) ||
    !AvatarOptionsSrc.includes(avatar)
  ) {
    return false
  } else {
    return true
  }
}
export { login, signup, updateProfile }
