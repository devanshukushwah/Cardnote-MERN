const express = require("express")
const router = express.Router()
const { signIn, signUp } = require("../3.Functions/user.js")

router.post("/signin", signIn)
router.post("/signup", signUp)
module.exports = router
