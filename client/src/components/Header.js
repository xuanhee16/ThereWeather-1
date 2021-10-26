import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faCloud, faCloudRain, faPooStorm, faSnowflake, faSearch } from "@fortawesome/free-solid-svg-icons"

const HeaderOuter = styled.div`
    width: 100vw;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #a2d2ff;
    padding: 1rem;

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
    flex-growth: 1;
    display: flex;
    align-items: center;

    div {
        margin: auto 1rem;
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
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    svg:hover {
        color: black;
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

export default function Header({ isInput, isMobileLogo, isLogin }) {
    // isInput : Map 페이지 사용시 true
    // isMobileLogo : Map 페이지 사용시 false
    // isLogin : 로그인 상태에 따라 - 로그인 되어있으면 true, 아니면 false

    return (
        <HeaderOuter className="header">
            <TitleAndLogo className="titleAndLogo" isMobileLogo={isMobileLogo}>
                <img src="img/img2.png" alt="logo" />
                <h1>거기날씨</h1>
            </TitleAndLogo>

            {isInput ? (
                <Center className="headerCenter">
                    <InputAndSubmit className="inputAndSubmit">
                        <Input type="text" placeholder="위치 검색" />
                        <Button bgGrey>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
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
                    <Button className="login" isText>
                        로그아웃
                    </Button>
                    <Button className="signup" isText>
                        마이페이지
                    </Button>
                </Wing>
            ) : (
                <Wing className="loginAndSingupButtons">
                    <Button className="login" isText>
                        로그인
                    </Button>
                    <Button className="signup" isText>
                        회원가입
                    </Button>
                </Wing>
            )}
        </HeaderOuter>
    )
}
