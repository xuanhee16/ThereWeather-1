// 로그인 상태에서 뜨는 화면
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { changeIsLogin } from "../actions/index"

const Outer = styled.div`
    margin: 0 auto;
    background-color: #fef9ef;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
`
const InfoBoxes = styled.div`
    margin: 0 auto;
`

const InfoBox = styled.div`
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 10px;
    width: 40vw;
    height: 10vh;
    text-align: center;
    p {
        font-size: 2.5rem;
        margin: 0;
        line-height: 10vh;
        @media screen and (max-width: 375px) {
            font-size: 1rem;
        }
    }
    &:nth-child(2) {
        margin-top: 3vh;
    }
    &:hover {
        background-color: #f4b567;
        color: #ffffff;
    }

    @media screen and (max-width: 1081px) {
        /* border: 1px solid green; */
    }
`
let url = process.env.REACT_APP_LOCAL_URL

export default function UserInfo() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { isLogin } = useSelector((state) => state.itemReducer)
    if (!url) {
        url = "https://thereweather.space"
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
        <Outer>
            <InfoBoxes>
                <InfoBox onClick={() => history.push("/mypage")}>
                    <p>마이페이지</p>
                </InfoBox>
                <InfoBox>
                    <button onClick={() => history.push("/messenger")}>
                        <p>메신져</p>
                    </button>
                </InfoBox>
                <InfoBox>
                    <button onClick={logoutBtnHandler}>
                        <p>로그아웃</p>
                    </button>
                </InfoBox>
            </InfoBoxes>
        </Outer>
    )
}
