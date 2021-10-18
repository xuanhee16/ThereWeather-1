require("dotenv").config()
const fs = require("fs")
const path = require("path")
const https = require("https")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
// const controllers = require("./controllers")
const multer = require("multer")
const logger = require("morgan")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(
//   cors({
//     origin: [url],
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//     // exposedHeaders: ["Authorization", "Content-Disposition"],
//   })
// )
app.use(logger("dev")) //서버요청 로그
app.use(cookieParser())
// app.use(express.static("public"))

// const storage = multer.diskStorage({
//   destination: "./public/img/",
//   filename: function (req, file, cb) {
//     cb(null, "imgfile" + Date.now() + path.extname(file.originalname))
//   },
// })
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 20 * 1024 * 1024 },
// })
app.get("/", (req, res) => {
  res.send("Hello World!!")
})

// app.get("/auth", controllers.auth)

const HTTPS_PORT = process.env.HTTPS_PORT || 80

let server
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8")
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8")
  const credentials = { key: privateKey, cert: certificate }
  server = https.createServer(credentials, app)
  server.listen(HTTPS_PORT, () => console.log("https server runnning"))
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server runnning"))
}
module.exports = server
