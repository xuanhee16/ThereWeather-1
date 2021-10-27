require("dotenv").config()
const fs = require("fs")
const path = require("path")
const https = require("https")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const controllers = require("./controllers")
const multer = require("multer")
const logger = require("morgan")
const userRouter = require("./routes/user")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        // origin: [url],
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "DELETE", "OPTIONS"],
        // exposedHeaders: ["Authorization", "Content-Disposition"],
    })
)
app.use(logger("dev")) //서버요청 로그
app.use(cookieParser())
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function (req, file, cb) {
        cb(null, "imgfile" + Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})

app.get("/", (req, res) => {
    res.send("Hello World!!ThereWeather!!")
})

//get 
app.get("/auth", controllers.auth)
app.get("/bookmark", controllers.bookmark)
app.get("/codi", controllers.codi)
app.get("/home", controllers.home)
app.get("/map", controllers.map)
app.get("/mypage", controllers.mypage)
app.get("/readpost", controllers.readpost)

//post 
app.post("/login", controllers.login)
app.post("/signout", controllers.signout)
app.post("/signup", controllers.signup)
app.post("/post", controllers.post)

//put 
app.put("/password", controllers.password)
app.put("/userinfo", controllers.userinfo)
app.put("/userphoto", controllers.userphoto)
app.put("/editpost", controllers.editpost)


//delete
// app.delete("/deletepost", controllers.deletepost)
// app.delete("/removeuser", controllers.removeuser)

//겹치는거
// app.use("/users", upload.single("img"), userRouter)

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
