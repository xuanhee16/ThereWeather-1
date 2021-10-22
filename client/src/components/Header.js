import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faCloud, faCloudRain, faPooStorm, faSnowflake, faSearch } from "@fortawesome/free-solid-svg-icons"

{/* TODO
	- [] 로고와 이름 사이의 간격
	- [] 로그인 - 회원가입 버튼 사이의 간격
	- [] 모바일에서 h2 로그인 위의 공간 줄이기
*/}

const HeaderOuter = styled.div`
	width: 100vw;
	height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #A2D2FF;
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

const Wings = styled.div`
	display: none;

	@media screen and (min-width: 1081px) {
		display: flex;
		flex-growth: 1;
		align-items: center;
		justify-content: space-around;
		width: 20vw;
	}

	& img {
		width: 20%;
		height: 20%;
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
            <Wings>
                <Button isText>로그인</Button>
                <Button isText>회원가입</Button>
            </Wings>
        </HeaderOuter>
    )
}
