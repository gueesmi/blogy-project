const express = require("express")
const router = express.Router()
const { login, register, me, logout, profile } = require('../controllers/user.controller')
const verifyToken = require("../middlewares/verifyToken")


router.post("/register", register)
router.post("/login", login)
router.get("/me", me)
router.get("/logout", logout)
router.get("/profile", verifyToken, profile)



module.exports = router