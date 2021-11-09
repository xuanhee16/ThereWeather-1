// 로그아웃 상태에서 뜨는 화면
import { useHistory } from "react-router-dom"
import styled from "styled-components"

const Outer = styled.div`
    margin: 0 auto;
    background-color: var(--page-bg-color);
    width: 100vw;
    height: calc(100vh - 125px);
    display: flex;
    align-items: center;

    @media screen and (max-width: 1081px) {
        height: calc(100vh - 125px - 70px);
    }
`

const InfoBoxes = styled.div`
    margin: 0 auto;
`

const InfoBox = styled.div`
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 10px;
    width: 30vw;
    height: 10vh;
    text-align: center;
    border: 1px solid #dbdbdb;
    p {
        font-size: 1.5rem;
        color: #dbdbdb;
        margin: 0;
        line-height: 10vh;
        @media screen and (max-width: 375px) {
            font-size: 1rem;
        }
    }
    &:nth-child(n+2) {
        margin-top: 3vh;
    }
    &:hover {
        border: 1px solid #262626;
        p{
            color: #262626;
        }
    }

    @media screen and (max-width: 1081px) {
        /* border: 1px solid green; */
    }
    @media screen and (max-width: 375px) {

    }
`

export default function More() {
    const history = useHistory()
    return (
        <Outer>
            <InfoBoxes>
                <InfoBox onClick={() => history.push("/signup")}>
                    <p>회원가입</p>
                </InfoBox>
                <InfoBox onClick={() => history.push("/login")}>
                    <p>로그인</p>
                </InfoBox>
            </InfoBoxes>
        </Outer>
    )
}
