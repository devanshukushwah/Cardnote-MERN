const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { user } = require("../1.Modal/user.js")

const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await user.findOne({ email })
    if (!existingUser)
      return res.status(200).json({ success: false, message: "user not found" })

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    )

    if (!isPasswordCorrect)
      return res
        .status(200)
        .json({ success: false, message: "password not match" })
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test"
    )
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName } = req.body
  if (password !== confirmPassword)
    return res
      .status(200)
      .json({ success: false, message: "password not match" })

  try {
    const existingUser = await user.findOne({ email })
    if (existingUser)
      return res
        .status(200)
        .json({ success: false, message: "user already exist" })

    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await user.create({
      email,
      password: hashedPassword,
      name: firstName,
    })
    const token = jwt.sign({ email: result.email, id: result._id }, "test")
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { signUp, signIn }
