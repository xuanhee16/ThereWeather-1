import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faCloud, faCloudRain, faPooStorm, faSnowflake, faSearch } from "@fortawesome/free-solid-svg-icons"

const HeaderOuter = styled.div`
    // background-color: yellow;
    width: 100%;
    //아래가 pc
    @media screen and (min-width: 1081px) {
        // background-color: #d9f576;
        width: 100%;
        // height: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
`

const Wings = styled.div`
    display: none;

    @media screen and (min-width: 1081px) {
        // border: 1px solid red;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 0.8rem;
        max-width: 20vw;
    }

    & > img {
        width: 20%;
        height: 20%;
    }
`

const Center = styled.div`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1081px) {
        flex-direction: row;
    }
`

const InputAndSubmit = styled.div`
    // border: 1px solid red;
    margin: 0 auto;
    // display: flex;
    // justify-content: space-around;
    @media screen and (min-width: 1081px) {
        flex-growth: 1;
        display: flex;
        align-items: center;
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
`

const Button = styled.button`
    background-color: ${(props) => (props.grey ? "#E0E0E0" : "white")};
    font-size: ${(props) => (props.isText ? "1.2rem" : "1.8rem")};
    padding: ${(props) => (props.isText ? ".6rem" : ".4rem")};
    margin: 0.5rem;
    border-radius: 10%;
`

export default function Header({ isInput }) {
    return (
        <HeaderOuter className="header">
            <Wings className="title">
                {/* <img src="img/img0.png" alt="logo" /> */}
                {/* <img src="img/img1.png" alt="logo" /> */}
                {/* <img src="img/img2.png" alt="logo" /> */}
                <img src="img/img3.png" alt="logo" />
                <h1>거기날씨</h1>
            </Wings>
            {isInput ? (
                <Center className="headerCenter">
                    <InputAndSubmit className="inputAndSubmit">
                        <Input type="text" placeholder="위치 검색" />
                        <Button grey>
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
                ""
            )}
            <Wings>
                <Button isText>
                    <div font-family="BMDOHYEON">Login</div>
                </Button>
                <Button isText>
                    <div font-family="BMDOHYEON">SignUp</div>
                </Button>
            </Wings>
        </HeaderOuter>
    )
}
