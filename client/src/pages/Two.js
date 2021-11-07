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
const socket = io.connect("http://localhost:80")
export default function Two() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))
    // {/* <Container2 src="/img/fhd.png" /> */}
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        //네비게이터함수로 내캠의 영상을 가져옴
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                //stream자체가 영상으로 추정된다.
                setStream(stream)
                myVideo.current.srcObject = stream
            })

        //서버에서 보낸 내 소켓아이디
        socket.on("me", (id) => {
            setMe(id)
            console.log("id= " + id)
        })

        //서버로부터 callUser이벤트를 받으면 실행할 함수
        //전화받는사람 클라이다.
        socket.on("callUser", (data) => {
            console.log("전화받는사람")
            console.log(data)

            //전화를 받았는지를 트루값으로 변경
            setReceivingCall(true)
            //caller전화거는 사람이라는 변수에 data.from을 담았다.
            setCaller(data.from)
            //Name 이름이라는 변수에 data.name 담았다.
            setName(data.name)
            //전화거는사람의 영상신호를 담는다.
            setCallerSignal(data.signal)
        })
    }, [])

    const callUser = (id) => {
        //전화거는 순간 찍힌다 이게
        console.log("callUser언제찍히냐")
        //동료를만든다
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        })
        console.log(peer)

        peer.on("signal", (data) => {
            console.log("전화거는사람")
            console.log(data)
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        console.log("answerCall 전화받는순간찍히겠지")
        setCallAccepted(true)

        //동료를 만든다
        const peer = new Peer({
            //전화를 걸었는가? 아니오
            initiator: false,
            trickle: false,
            stream: stream,
        })

        //피어가 만들어지면인가?
        peer.on("stream", (stream) => {
            console.log("stream 이건 대체 언제찍히냐")
            console.log(stream)
            userVideo.current.srcObject = stream
        })
        peer.on("signal", (data) => {
            console.log("signal이건 대체 언제찍히냐")
            console.log(data)
            socket.emit("answerCall", { signal: data, to: caller })
        })
        // 원격 피어가 `peer.on('signal')` 이벤트를 방출할 때마다
        // 이 메소드를 호출하십시오. `data`는 webrtc 제안, 응답 또는
        // 얼음 후보를 캡슐화합니다. 이러한 메시지는 피어가 결국 서로에
        // 대한 직접 연결을 설정하는 데 도움이 됩니다. 이 문자열의
        //  내용은 이 모듈의 사용자가 무시할 수 있는 구현 세부
        // 정보입니다. 'signal' 이벤트의 데이터를 원격 피어로 전달하고
        // 'peer.signal(data)'을 호출하여 연결하기만 하면 됩니다.
        peer.signal(callerSignal)

        connectionRef.current = peer
    }
    //전화끄기 누르면  setCallEnded을 트루로 바꿔주어서 비디오div를 없애고,
    const leaveCall = () => {
        setCallEnded(true)
        //통화를 파괴한다
        connectionRef.current.destroy()
    }
    return (
        <Container className="mapcontainer">
            나는 시청자
            <div className="video">
                <video
                    playsInline
                    ref={userVideo}
                    autoPlay
                    style={{ width: "300px" }}
                />
            </div>
            <button onClick={callUser}>'콜유져 버튼'</button>
            <button onClick={answerCall}>'엔서콜 버튼'</button>
            <button onClick={leaveCall}>'떠나기' 버튼'</button>
        </Container>
    )
}
