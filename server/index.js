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
const { isAuthorized } = require("./controllers/tokenFunc/index")
const { user } = require("./models/index")
const { encrypto } = require("./controllers/get/setpw")

// const weather = require("./controllers/post/weather.js")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        // origin: [url],
        // origin: "https://there-weather.vercel.app",
        origin: process.env.CLIENT_URL || "https://there-weather.vercel.app",
        // origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

// app.get("/2", (req, res) => {
//     res.send("Hello World!!22!2")
// })
// app.get("/", (req, res) => {
//     res.send("Hello World!!ThereWeather!!!!")
// })
app.get("/map2", controllers.map)
//기상청 날씨 api
// app.get("/", async(req, res) => {
//     //서울시 중구
//     await weather('x', 'y', (error, {weathers}={}) => {
//         if(error){
//             console.log("index:",error)
//             res.send(error)
//         }
//         else{
//             console.log("index:",weathers)
//             res.send(weathers)
//         }
//     })
// })

//겹치는거
app.use("/users", upload.single("img"), userRouter)
app.use("/post", upload.single("img"), postRouter) //글쓰는 곳 - Write.js
app.post("/sociallogin", controllers.sociallogin) //인증 - App.js

//get
//인증 - App.js
// app.get("/auth", controllers.auth) //인증 - App.js

app.get("/bookmark", controllers.bookmark) //북마크 보는 곳 - BookMark.js
app.get("/codi", controllers.codi) //북마크에서 코디 누르면 확대해서 보는 곳 - Codi.js
app.get("/home", controllers.home) //홈 - Home.js
app.get("/weather", controllers.weather)
app.post("/mypage", controllers.mypage) //마이페이지 - MyPage.js
app.get("/readpost", controllers.readpost) //예보글보기 - PostRead.js

//post
app.post("/login", controllers.login) //로그인시 - Login.js
app.post("/signout", controllers.signout) //로그아웃시
app.post("/map", controllers.map) //지도 - Map.js

//put
app.put("/password", controllers.password) //비밀번호 수정시 - MyPage.js
app.put("/userinfo", controllers.userinfo) //마이페이지에서 본인 정보 수정시 - MyPage.js
app.put("/userphoto", controllers.userphoto) //프로필 사진 변경시 - MyPage.js
app.put("/editpost", controllers.editpost) //예보글 수정시 - PostRead.js

//delete
app.delete("/deletepost", controllers.deletepost) //예보글 삭제 - PostRead.js
app.delete("/removeuser", controllers.removeuser) //회원탈퇴 - MyPage.js

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
console.log("feat/socket")
server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: process.env.CLIENT_URL || "https://there-weather.vercel.app",
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
    socket.on("enter_room", (roomName) => {
        console.log(socket.rooms)
        console.log(roomName)
        socket.join(roomName)
        socket.to(roomName).emit("welcome")
    })
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye"))
    })
    socket.on("newMsg", (msg, room, done) => {
        // socket.rooms.forEach((room) => socket.to(room).emit("bye"))
        socket.to(room).emit("newMsg", msg)
        done()
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
