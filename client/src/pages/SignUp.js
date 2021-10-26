import { useState, useEffect } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { Toggle } from "../components/Toggle"
import DaumPostcode from "react-daum-postcode"

/*
  TODO
  [x] 여러개의 Input 상태 관리
  [] 유효성 검사
    - [x] ul, li 추가
    - [] 함수로 구현
      - [x] input이 없는 경우
      - [] 등록되지 않은 정보인 경우
        - [] 악시오스
        - [] 모달? alert? 페이지에 렌더링?
*/

const Outer = styled.section`
    position: relative;
    width: 100vw;
    // height: var(--mobile-page-height);
    background-color: var(--page-bg-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    font-family: "BMDOHYEON";

    h2 {
        margin-top: 3rem;
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    @media screen and (min-width: 1081px) {
        // height: calc(100vh - 125px);
    }
`

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const InputAndTitle = styled.div`
    // display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 1rem;

    h3 {
        font-size: 1.4rem;
        margin: 1rem;
        font-weight: bold;
    }
`
const InputAndTitle2 = styled.div`
    // border: 1px solid blue;

    display: flex;
    flex-direction: row;
    // margin-top: -7rem;
    // padding-top: -5rem;

    align-items: center;
    h3,
    div {
        font-size: 1.4rem;
        margin: 1rem;
        font-weight: bold;
        margin-right: -1rem;
    }
    h3 {
        margin-left: 2rem;
    }
`
const InputAndTitle3 = styled.div`
    border: 1px solid red;
    display: flex;
    justify-content: left;
    flex-direction: row;

    align-items: center;
    margin: 1rem;

    h3 {
        font-size: 1.4rem;
        margin: 1rem;
        font-weight: bold;
        margin-right: -1rem;
        margin-bottom: -7rem;
    }
`

const InputText = styled.input`
    min-width: 150px;
    width: 30vw;
    font-size: 1.2rem;
    padding: 0.5rem;
`

const ValidationListBox = styled.ul`
    list-style: none;
    padding: 0 1.5rem;
    font-size: 1rem;

    li {
        height: 1.2rem;
        padding: 0 1.5rem;
        color: var(--font-validation-negative);
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem auto;
`

const Button = styled.button`
    width: 50vw;
    min-width: 100px;
    max-width: 300px;
    margin: 1rem;
    padding: 0.8rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background-color: ${(props) => (props.google ? "#EA4335" : "#419300")};
    border-radius: 1rem;

    > span {
        margin: 0.25rem;
    }
`

export default function SignUp() {
    // input 상태 관리, 유효성 검사
    const [inputSignUpData, setInputSignUpData] = useState({ idInput: "", pwInput: "", nickNameInput: "" })
    const [inputVaildMessage, setInputVaildMessage] = useState({ idInput: "아이디를 입력해주세요.", pwInput: "패스워드를 입력해주세요.", nickNameInput: "닉네임을 입력해주세요." })
    const [pwCheckInput, setPwCheckInput] = useState("")
    const [pwCheckInputMessage, setPwCheckInputMessage] = useState("패스워드를 다시한번 입력해주세요.")
    const [userAddress, setUserAddress] = useState("")
    const [userRoadAddress, setRoadUserAddress] = useState("위 검색창에서 검색해주세요.")

    const idOnChangeHanlder = (key) => (e) => {
        setInputSignUpData({
            ...inputSignUpData,
            [key]: e.target.value,
        })
    }
    const idOnChangeHanlder2 = (e) => {
        setPwCheckInput(e.target.value)
    }

    //영어랑 숫자만 가능
    function onlyNumberAndEnglish(str) {
        return /^[A-Za-z][A-Za-z0-9]*$/.test(str)
    }
    // [유효성 검증 함수]: 최소 6자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함
    function strongPassword(str) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(str)
    }
    //아이디길이가 4자이상인가
    function isMoreThan4Length(word) {
        return word.length >= 4
    }
    //패스워드가 같은가
    function isMatch(pwd1, pwd2) {
        return pwd1 === pwd2
    }
    //닉네임 길이 2글자 이상인가
    function nickIsMoreThan4Length(word) {
        return word.length >= 2
    }

    useEffect(() => {
        //아이디 유효성검사
        if (onlyNumberAndEnglish(inputSignUpData.idInput) && isMoreThan4Length(inputSignUpData.idInput)) {
            setInputVaildMessage({ ...inputVaildMessage, idInput: "" })
        } else {
            setInputVaildMessage({
                ...inputVaildMessage,
                idInput: "사용 불가능한 아이디 입니다.",
            })
        }
    }, [inputSignUpData.idInput])

    useEffect(() => {
        //패스워드 유효성
        if (strongPassword(inputSignUpData.pwInput)) {
            console.log("여긴엘스문아닌곳")

            setInputVaildMessage({ ...inputVaildMessage, pwInput: "" })
        } else if (!strongPassword(inputSignUpData.pwInput)) {
            console.log("여긴엘스문인데")
            setInputVaildMessage({
                ...inputVaildMessage,
                pwInput: "사용 불가능한 패스워드 입니다.",
            })
        }
        //패스워드 학인 유효성
        if (isMatch(inputSignUpData.pwInput, pwCheckInput) && pwCheckInput.length === 0) {
            setPwCheckInputMessage("패스워드를 다시한번 입력해주세요.")
        } else if (isMatch(inputSignUpData.pwInput, pwCheckInput)) {
            setPwCheckInputMessage("")
        } else {
            setPwCheckInputMessage("비밀번호가 일치 하지 않습니다.")
        }
        console.log(inputSignUpData)
        console.log(inputVaildMessage)
    }, [inputSignUpData.pwInput, pwCheckInput])

    useEffect(() => {
        //닉네임 유효성검사
        if (nickIsMoreThan4Length(inputSignUpData.nickNameInput)) {
            setInputVaildMessage({ ...inputVaildMessage, nickNameInput: "" })
        } else {
            setInputVaildMessage({
                ...inputVaildMessage,
                nickNameInput: "닉네임은 두글자 이상 입니다.",
            })
        }
    }, [inputSignUpData.nickNameInput])

    function handleComplete(complevet) {
        setRoadUserAddress(complevet.roadAddress)
        setUserAddress(complevet.address)
    }

    return (
        <Outer className="SignUpPageComponent">
            <h2>회원가입</h2>
            <div className="SignUp--center">
                <StyledArticle className="id">
                    <InputAndTitle className="inputIdSection">
                        <h3>아이디</h3>
                        <InputText type="text" name="idInput" placeholder="아이디" onChange={idOnChangeHanlder("idInput")} />
                    </InputAndTitle>
                    <ValidationListBox className="idValidationList">
                        <li>{inputVaildMessage.idInput}</li>
                    </ValidationListBox>
                </StyledArticle>
                <StyledArticle className="password">
                    <InputAndTitle className="inputPwSection">
                        <h3>비밀번호</h3>
                        <InputText type="password" name="pwInput" placeholder="비밀번호" onChange={idOnChangeHanlder("pwInput")} />
                    </InputAndTitle>
                    <ValidationListBox className="pwValidationList">
                        <li>{inputVaildMessage.pwInput}</li>
                    </ValidationListBox>
                </StyledArticle>
                <StyledArticle className="password">
                    <InputAndTitle className="inputPwSection">
                        <h3>비밀번호 확인</h3>
                        <InputText type="password" name="pwCheckInput" placeholder="비밀번호 확인" onChange={idOnChangeHanlder2} />
                    </InputAndTitle>
                    <ValidationListBox className="pwValidationList">
                        <li>{pwCheckInputMessage}</li>
                    </ValidationListBox>
                </StyledArticle>
                <StyledArticle className="password">
                    <InputAndTitle className="inputPwSection">
                        <h3>닉네임</h3>
                        <InputText type="text" name="nickNameInput" placeholder="닉네임" onChange={idOnChangeHanlder("nickNameInput")} />
                    </InputAndTitle>
                    <ValidationListBox className="pwValidationList">
                        <li>{inputVaildMessage.nickNameInput}</li>
                    </ValidationListBox>
                </StyledArticle>
                <StyledArticle className="1">
                    <InputAndTitle2 className="2">
                        <h3>성별</h3>
                        <Toggle></Toggle>
                    </InputAndTitle2>
                    <ValidationListBox className="pwValidationList">{/* <li>{inputVaildMessage}</li> */}</ValidationListBox>
                </StyledArticle>
                <StyledArticle className="password">
                    <InputAndTitle className="inputPwSection">
                        <h3>사는곳</h3>
                        <DaumPostcode onComplete={handleComplete} />
                    </InputAndTitle>
                    <ValidationListBox className="pwValidationList">{userRoadAddress}</ValidationListBox>
                </StyledArticle>
                <StyledArticle className="password">
                    <InputAndTitle className="inputPwSection">
                        <h3>프로필사진</h3>
                        <InputText type="text" name="photoInput" placeholder="사진" onChange={() => idOnChangeHanlder("photoInput")} />
                    </InputAndTitle>
                    <ValidationListBox className="pwValidationList">{/* <li>{inputVaildMessage}</li> */}</ValidationListBox>
                </StyledArticle>
            </div>

            <Buttons className="SignUp--buttons">
                <Button>가입</Button>
            </Buttons>
        </Outer>
    )
}
