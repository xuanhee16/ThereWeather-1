import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faCloud, faCloudRain, faPooStorm, faSnowflake, faSearch } from "@fortawesome/free-solid-svg-icons"

const HeaderOuter = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #85c1e9;
    padding: 1rem;

    @media screen and (min-width: 1081px) {
        width: 100vw;
        background-color: white;
        border-bottom: 1px solid #757575;
        flex-direction: row;
        justify-content: space-around;
    }
`

const Wings = styled.div`
    display: none;

    @media screen and (min-width: 1081px) {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 20vw;
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
    flex-growth: 1;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    padding: 0.5rem;
    font-size: 1.2rem;
    text-align: center;

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
                <img src="img/sun.png" alt="logo" />
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
                <Button isText>로그인</Button>
                <Button isText>회원가입</Button>
            </Wings>
        </HeaderOuter>
    )
}
