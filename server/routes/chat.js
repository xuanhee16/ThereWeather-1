const express = require("express")
const router = express.Router()
const { chatsController } = require("../controllers")

router.post("/rooms", chatsController.rooms.post)
router.get("/rooms", chatsController.rooms.get)
router.post("/messagelist", chatsController.messagelist.post)
router.get("/messagelist", chatsController.messagelist.get)

module.exports = router
