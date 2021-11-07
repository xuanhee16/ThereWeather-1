import React, { useEffect, useState, useRef } from "react"
// import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import MapBox from "../components/MapBox"
import Peer from "simple-peer"
import io from "socket.io-client"

const Container = styled.div`
    // background-color: #f1319e;
    width: 100%;
    border: 1px solid pink;
    position: relative;

    @media screen and (min-width: 1081px) {
        // background-color: yellow;
        // max-width: 100%;
        width: 100%;
        position: relative;
    }
`

let url = process.env.REACT_APP_LOCAL_URL
if (!url) {
    url = "https://thereweather.space"
}
// const socket = io.connect("http://localhost:80")
const socket = io.connect(url)

export default function One() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))
    // {/* <Container2 src="/img/fhd.png" /> */}
    const [roomName, setroomName] = useState("")
    const [msg, setmsg] = useState([])
    const [msgevent, setmsgevent] = useState("")

    function roomNamefunc(e) {
        console.log(e.target.value)
        setroomName(e.target.value)
    }

    function roomNameSubmit(event) {
        socket.emit("enter_room", roomName)
    }

    function msgfunc(e) {
        console.log(e.target.value)
        setmsgevent(e.target.value)
    }

    function msgSubmit() {
        socket.emit("newMsg", msgevent, roomName, () => {
            console.log("메시지추가 직혀라")
            setmsg(["you=" + msgevent, ...msg])
        })
    }
    // socket.on("newMsg", setmsg([msg, ...msg]))

    console.log("asdasd")
    socket.on("welcome", () => {
        console.log("메시지가 찍히나")
        setmsg(["누군가가 방에 들어왔습니다", ...msg])
    })
    socket.on("bye", () => {
        console.log("메시지가 찍히나")
        setmsg(["누가 나갔습니다", ...msg])
    })
    socket.on("newMsg", (msg2) => {
        console.log("메시지 적용되야됨")
        setmsg([msg2, ...msg])
    })

    return (
        <Container className="mapcontainer">
            <div>나는 사용자1</div>

            <input
                onChange={(e) => roomNamefunc(e)}
                placeholder="방이름"
                required
                type="text"
            />
            <button onClick={roomNameSubmit}>방 입장</button>

            <input
                onChange={(e) => msgfunc(e)}
                placeholder="메시지"
                required
                type="text"
            />
            <button onClick={msgSubmit}>보내기</button>
            {msg.map((el) => {
                return <div>{el}</div>
            })}
        </Container>
    )
}
