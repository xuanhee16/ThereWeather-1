import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faSun,
    faCloud,
    faCloudRain,
    faPooStorm,
    faSnowflake,
    faSearch,
} from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { changeIsLogin, changeSearchword } from "../actions/index"
import React, { useState, useEffect } from "react"
import DaumPostcode from "react-daum-postcode"

const HeaderOuter = styled.div`
    width: 100vw;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: WHTIE;
    padding: 1rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 100;

    h1 {
        font-weight: bold;
        font-size: 2.5rem;
        margin: 0;
        padding: 0;
    }

    @media screen and (min-width: 1081px) {
        width: 100vw;
        height: 125px;
        background-color: white;
        border-bottom: 1px solid #757575;
        flex-direction: row;
        justify-content: space-around;
    }
    @media screen and (max-width: 375px) {
        height: 30%;
    }
`

const Wing = styled.div`
    display: none;

    @media screen and (min-width: 1081px) {
        display: flex;
        flex-growth: 1;
        align-items: center;
        justify-content: center;
        width: 20vw;
    }
`

const TitleAndLogo = styled.div`
    display: ${(props) => (props.isMobileLogo ? "flex" : "none")};
    justify-content: center;
    align-items: center;

    & img {
        width: 20%;
        margin-right: 1rem;
    }

    @media screen and (min-width: 1081px) {
        display: flex;
        flex-growth: 1;
        align-items: center;
        justify-content: center;
        width: 20vw;
    }
`

const Center = styled.div`
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 1081px) {
        flex-direction: row;
        flex-growth: 2;
        width: 60vw;
    }
`

const InputAndSubmit = styled.div`
    /* flex-growth: 1; */
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        margin: auto 1rem;
    }
    @media screen and (max-width: 1081px) {
        div {
            margin: 0;
        }
    }
`

const Input = styled.input`
    padding: 0.5rem;
    font-size: 1.2rem;
    text-align: center;
    font-family: "BMDOHYEON";

    @media screen and (min-width: 1081px) {
        width: 300px;
    }
    @media screen and (max-width: 375px) {
        width: 220px;
    }
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    svg:hover {
        color: black;
    }

    @media screen and (max-width: 375px) {
        button {
            width: 35px;
            height: 35px;
            font-size: 20px;
        }
    }
`

const Button = styled.button`
    background-color: ${(props) => (props.bgGrey ? "#E0E0E0" : "white")};
    color: ${(props) => (props.bgGrey || props.isText ? "black" : "grey")};
    font-size: ${(props) => (props.isText ? "1.2rem" : "1.6rem")};
    padding: ${(props) => (props.isText ? ".6rem" : ".4rem")};
    margin: 0.5rem;
    border-radius: 10%;
`
const SearchBarAndDaumPost = styled.div`
    // display: flex;
    // flex-direction: row;
    position: relative;
    margin: "100px solid green";
`
const DaumPostcodeWrap = styled.div`
    height: 3.5rem;
    width: 100%;
    // padding-right: 2.5rem;
`
const Cancel = styled.button`
    // height: 3.5rem;
    // width: 100%;
    // padding-right: 2.5rem;
    margin-bottom: 0.4rem;
    font-size: 1rem;
`
const Buttons2 = styled.div`
    background-color: ${(props) => (props.bgGrey ? "#E0E0E0" : "white")};
    color: ${(props) => (props.bgGrey || props.isText ? "black" : "grey")};
    font-size: ${(props) => (props.isText ? "1.2rem" : "1.6rem")};
    padding: ${(props) => (props.isText ? ".6rem" : ".4rem")};
    margin: 0.5rem;
    border-radius: 10%;
`

let url = process.env.REACT_APP_LOCAL_URL

export default function Header({ isInput, isMobileLogo }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { isLogin } = useSelector((state) => state.itemReducer)
    const [searchEvent, setSearchEvent] = useState("")
    const [onFocus, setOnFocus] = useState(false)

    // const [postOnFocus, setOnFocus] = useState(false)

    if (!url) {
        url = "https://thereweather.space"
    }

    // isInput : Map 페이지 사용시 true
    // isMobileLogo : Map 페이지 사용시 false
    function handleComplete(e) {
        console.log(e)
        setSearchEvent(e.roadAddress)
        setOnFocus(false)
    }

    const logoutBtnHandler = (e) => {
        const token = JSON.parse(localStorage.getItem("ATOKEN"))
        axios
            .post(
                url + "/signout",
                { data: null },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `token ${token}`,
                    },
                    withCredentials: true,
                }
            )
            .then((res) => {
                localStorage.clear()
                dispatch(changeIsLogin(false))
                history.push("/")
            })
    }

    return (
        <HeaderOuter className="header">
            <TitleAndLogo className="titleAndLogo" isMobileLogo={isMobileLogo}>
                <img
                    onClick={() => history.push("/")}
                    src="img/img4.png"
                    alt="logo"
                />
                <h1 onClick={() => history.push("/")}>거기날씨</h1>
            </TitleAndLogo>

            {isInput ? (
                <Center className="headerCenter">
                    <InputAndSubmit className="inputAndSubmit">
                        <Input
                            // onClick={(e) => console.log(e)}
                            onChange={(e) => setSearchEvent(e.target.value)}
                            type="text"
                            placeholder="위치 검색"
                            value={searchEvent}
                            // ref={inputRef}
                            // onClick={onRest}
                            onFocus={(e) => setOnFocus(true)}
                        />
                        {/* <SearchBarAndDaumPost> */}
                        {/* <DaumPostcodeWrap> */}
                        {onFocus ? (
                            <DaumPostcode
                                onComplete={handleComplete}
                                style={{
                                    position: "absolute",
                                    left: "332px",
                                    top: "5px",
                                    border: "1px solid pink",
                                    // display: onFocus ? "none" : "true",
                                    // left: "0",
                                    // height: "80%",
                                    // width: "100%",
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        {/* </DaumPostcodeWrap> */}
                        {/* </SearchBarAndDaumPost> */}
                        <Buttons2 bgGrey>
                            {onFocus ? (
                                <Cancel onClick={() => setOnFocus(false)}>
                                    Cancel
                                </Cancel>
                            ) : (
                                <FontAwesomeIcon
                                    onClick={() =>
                                        dispatch(changeSearchword(searchEvent))
                                    }
                                    icon={faSearch}
                                />
                            )}
                        </Buttons2>
                    </InputAndSubmit>
                    <Buttons className="headerButtons">
                        <Button>
                            <FontAwesomeIcon icon={faSun} />
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faCloud} />
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faCloudRain} />
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faPooStorm} />
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faSnowflake} />
                        </Button>
                    </Buttons>
                </Center>
            ) : (
                <Center className="headerCenter" />
            )}

            {isLogin ? (
                <Wing className="loginAndSingupButtons">
                    {/* className="login" isText */}
                    <Button className="login" onClick={logoutBtnHandler} isText>
                        로그아웃
                    </Button>
                    <Button
                        onClick={() => history.push("/mypage")}
                        className="signup"
                        isText
                    >
                        마이페이지
                    </Button>
                </Wing>
            ) : (
                <Wing className="loginAndSingupButtons">
                    <Button
                        onClick={() => history.push("/login")}
                        className="login"
                        isText
                    >
                        로그인
                    </Button>
                    <Button
                        onClick={() => history.push("/signup")}
                        className="signup"
                        isText
                    >
                        회원가입
                    </Button>
                </Wing>
            )}
        </HeaderOuter>
    )
}
