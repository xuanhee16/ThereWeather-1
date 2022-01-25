require("dotenv").config()
const fs = require("fs")
const path = require("path")
const http = require("http")
const https = require("https")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const controllers = require("./controllers")
const multer = require("multer")
const logger = require("morgan")
const userRouter = require("./routes/user")
const postRouter = require("./routes/post")
const chatRouter = require("./routes/chat")
const helmet = require("helmet")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: process.env.CLIENT_URL || "https://thereweather.space",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
)
app.use(logger("dev")) //서버요청 로그
app.use(cookieParser())
app.use(express.static("public"))
app.use(helmet())

const storage = multer.diskStorage({
    destination: "./public/image/",
    filename: function (req, file, cb) {
        cb(null, "imgfile" + Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
})

//아래 내용 지우지말아주세요
app.get("/2", (req, res) => {
    res.send("Hello World!!22!222ss332s222")
})
app.get("/api/2", (req, res) => {
    res.send("Hello World!!22!222ss33222299")
})
app.get("/api/1", (req, res) => {
    res.send("Hello World!!22!222ss33222211")
})
app.get("/", (req, res) => {
    res.send("Hello World!!ThereWeather!!!!")
})

//겹치는거
app.use("/api/users", upload.single("img"), userRouter)
app.use("/api/post", upload.single("img"), postRouter) //글쓰는 곳 - Write.js
app.post("/api/sociallogin", controllers.sociallogin) //인증 - App.js
app.use("/api/chat", chatRouter) //인증 - App.js
app.get("/api/map2", controllers.map2) //지도 - Map.js

//get
//인증 - App.js
// app.get("/auth", controllers.auth) //인증 - App.js

app.get("/api/codi", controllers.codi) //없음
app.get("/api/readpost", controllers.readpost)
app.get("/api/mypage", controllers.mypage)
app.get("/api/mypost", controllers.mypost)
app.get("/bookmarklist", controllers.bookmarklist)
app.get("/api/commentlist", controllers.commentlist)

//post
app.post("/api/login", controllers.login)
app.post("/api/signout", controllers.signout)
app.post("/api/map", controllers.map)
app.post("/api/bookmark", controllers.bookmark)
app.post("/api/home", controllers.home)
app.post("/api/bookmarklist", controllers.bookmarklist)
app.post("/api/sendcomment", controllers.sendcomment)
app.post("/api/readbookmark", controllers.readbookmark)
app.post("/api/likecomment", controllers.likecomment) //댓글좋아요기능
app.post("/api/kakaologin", controllers.kakaologin)
app.post("/api/findaccount", controllers.findaccount)
app.post("/api/findpassword", controllers.findpassword)
app.post("/api/readlike", controllers.readlike)

//put
app.put("/api/password", controllers.password)
app.put("/api/edituserinfo", controllers.edituserinfo)
app.put("/api/userphoto", controllers.userphoto)
app.put("/api/editpost", controllers.editpost)
app.put("/api/checkuser", controllers.checkuser)

//delete
app.delete("/api/deletepost", controllers.deletepost)
app.delete("/api/removeuser", controllers.removeuser)
app.delete("/api/deletecomment", controllers.deletecomment)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000

let server
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
    const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8")
    const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8")
    const credentials = { key: privateKey, cert: certificate }
    server = https.createServer(credentials, app)
    server.listen(HTTPS_PORT, () => console.log("https server runnning"))
}
// else {
server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.CLIENT_URL || "https://thereweather.space",
        methods: ["GET", "POST"],
    },
})

//클라와 연결되면 시작할 함수
io.on("connection", (socket) => {
    // console.log(socket)

    console.log("나 연결")
    socket.onAny((event) => {
        console.log("onAny= " + event)
    })
    // socket.on("enter_room", (roomName) => {
    //     console.log(socket.rooms)
    //     console.log(roomName)
    //     socket.join(roomName)
    //     console.log(socket.rooms)
    //     socket.to(roomName).emit("welcome")
    // })
    // socket.on("disconnecting", () => {
    //     socket.rooms.forEach((room) => socket.to(room).emit("bye"))
    // })
    socket.on("message", (msgobj) => {
        // socket.rooms.forEach((room) => socket.to(room).emit("bye"))
        // console.log(msgobj)
        // socket.to(room).emit("newMsg", msg)
        // done()
        socket.emit("sendmsg", msgobj)
    })

    // // socket.emit("서버로 보낼 이벤트명", 데이터)
    // socket.emit("me", socket.id)

    // //클라로부터 disconnect 이벤트를 받을경우 실행할 함수
    // socket.on("disconnect", () => {
    //     //나를 제외한 전체에게 메세지를 보내는 방법
    //     console.log("disconnect연결")
    //     socket.broadcast.emit("callEnded")
    // })

    // //클라로부터 callUser 이벤트를 받을경우 실행할 함수
    // //전화가 닿으면 받기전에 미리 연결된다
    // socket.on("callUser", (data) => {
    //     console.log("callUser연결")

    //     io.to(data.userToCall).emit("callUser", {
    //         signal: data.signalData,
    //         from: data.from,
    //         name: data.name,
    //     })
    // })

    // //클라로부터 answerCall 이벤트를 받을경우 실행할 함수
    // //전화를 받기 완료 후 연결된다.
    // socket.on("answerCall", (data) => {
    //     console.log("answerCall연결")

    //     io.to(data.to).emit("callAccepted", data.signal)
    // })
})

server.listen(HTTPS_PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server is working : PORT - ", port)
})
// }
module.exports = server
