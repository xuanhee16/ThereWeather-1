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
const { isAuthorized } = require("./controllers/tokenFunc/index")
const { user } = require("./models/index")
const { encrypto } = require("./controllers/get/setpw")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        // origin: [url],
        origin: "https://there-weather.vercel.app",
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

app.get("/2", (req, res) => {
    res.send("Hello World!!22!2")
})
app.get("/", (req, res) => {
    res.send("Hello World!!ThereWeather!!!!")
})

//겹치는거
// app.use("/users", upload.single("img"), userRouter)
app.post("/sociallogin", controllers.sociallogin) //인증 - App.js

//get
app.post("/signup", async (req, res) => {
    console.log("여긴 users/signup/")
    console.log(req.body)
    const { user_id, nickName, password } = req.body
    //id중복검사와 닉네임 중복검사를 서버가 함.
    //id중복검사

    const user_Id_FindOne = await user.findOne({
        where: {
            // user_id: req.body.user_id,
            user_id,
        },
    })
    const nickName_FindOne = await user.findOne({
        where: {
            // nickName: req.body.nickName,
            nickName,
        },
    })
    if (user_Id_FindOne) {
        //id중복
        res.status(211).send("id중복")
    } else if (nickName_FindOne) {
        //id중복
        res.status(212).send("닉네임중복")
    } else {
        //정상의경우
        const enPw = encrypto(password)
        console.log("중복이 아닙니다.")
        await user.create({
            user_id: req.body.user_id,
            password: enPw,
            nickName: req.body.nickName,
            gender: req.body.gender,
            location: req.body.location,
            user_Photo: req.body.user_photo,
        })

        res.status(210).send("signup ok")
    }
}) //인증 - App.js
// app.get("/auth", controllers.auth) //인증 - App.js

app.get("/bookmark", controllers.bookmark) //북마크 보는 곳 - BookMark.js
app.get("/codi", controllers.codi) //북마크에서 코디 누르면 확대해서 보는 곳 - Codi.js
app.get("/home", controllers.home) //홈 - Home.js
app.get("/map", controllers.map) //지도 - Map.js
app.get("/mypage", controllers.mypage) //마이페이지 - MyPage.js
app.get("/readpost", controllers.readpost) //예보글보기 - PostRead.js

//post
app.post("/login", controllers.login) //로그인시 - Login.js
app.post("/signout", controllers.signout) //로그아웃시
app.post("/post", controllers.post) //글쓰는 곳 - Write.js

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
} else {
    server = app.listen(HTTPS_PORT, () => console.log("http server runnning"))
}
module.exports = server
