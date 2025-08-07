const express = require("express")
const SEND_ALL = require("../../Controller/8. Notification/1. SEND_ALL")
const Authenticate = require("../../Middlewares/Authenticate")
const SEND_SELECTED_USER = require("../../Controller/8. Notification/2. SEND_SELECTED")

const router = express.Router()

router.route("/notification").post(Authenticate, SEND_ALL)

router.route("/notification/user").post(Authenticate, SEND_SELECTED_USER)


module.exports = router