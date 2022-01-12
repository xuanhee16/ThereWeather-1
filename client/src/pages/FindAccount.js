import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { changeMapPage } from "../actions/index"
import FindAccountModal from "../components/FindAccountModal"

const Outer = styled.div`
    width: 100%;
    height: 100%;
`

const Form = styled.div`
    width: 400px;
    height: auto;
    margin: 4rem auto 0 auto;

    #title {
        font-size: 1.5rem;
    }
`

const Div1 = styled.div`
    margin-bottom: 2rem;
    text-align: center;
`
const Div2 = styled.div`
    ul {
        list-style: none;
    }
    li {
        margin: 1rem 0;
        display: flex;
        padding: 0.5rem 0;
    }
    p {
        width: 100px;
    }
    input {
        width: 200px;
    }
    button {
        margin-left: 1rem;
        width: 4rem;
        background-color: pink;
        &:hover {
            background-color: #ff7f9f;
            color: white;
        }
    }
`
const Button = styled.button`
    display: block;
    margin: 2rem auto 0 auto;
    width: 7rem;
    height: 2rem;
    font-size: 1rem;
    background-color: pink;
        &:hover {
            background-color: #ff7f9f;
            color: white;
    }
`

let url = process.env.REACT_APP_LOCAL_URL

export default function FindAccount(){
    const history = useHistory()
    const dispatch = useDispatch()
    if (!url) {
        url = "https://thereweather.space/api"
    }

    const [inputFindInfo, setInputFindInfo] =  useState({
        findNickName: "",
        authEmail: "",
        authCode: "",
    })
    
    // 모달창
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        dispatch(changeMapPage(false))
    }, [])

    const ChangeHanlder = (key) => (e) => {
        setInputFindInfo({
            ...inputFindInfo,
            [key]: e.target.value,
        })
    }

    function sendEmail() {
      //console.log("이메일 전송 버튼")
      if(inputFindInfo.findNickName && !inputFindInfo.authCode){
        axios({
          url: url + "/users/auth",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            temporary_id: inputFindInfo.findNickName,
            email: inputFindInfo.authEmail
          },
          withCredentials: true
        })
        .then((res) => {
            console.log(res.data.status)
            if(res.data.status === "success"){
                alert("인증메일을 발송하였습니다. 3분내로 확인해주세요:)")
            }else{
                alert("인증메일 발송에 실패하였습니다.")
            }   
        })
      }else{
        alert("닉네임과 이메일을 입력해주세요.")
      }
    }

    function verification() {
      //console.log("인증코드 버튼")
      axios({
        url: url + "/users/auth",
        method: "put",
        headers: {
          "Content-Type": "application/json", 
        },
        data: {
          temporary_id: inputFindInfo.findNickName,
          email: inputFindInfo.authEmail,
          code: inputFindInfo.authCode
        },
        withCredentials: true
      })
      .then((res) => {
        // console.log(res.data)
        if(res.data.status === "true"){ 
            alert("메일 인증 되었습니다.")
        }else{
            alert("인증코드가 맞지 않습니다. 다시 확인해주세요:)")
        }
      })
    }

    function findAccountId() {
      console.log("아이디 찾기 버튼")
      setIsOpen(true)
      //닉네임, 이메일, 인증코드가 모두 채워져 있으면 함수를 실행하게함
      //악시오스 요청으로 아이디찾기 백엔드로 보내서 -> 닉네임, 이메일, 인증코드 확인하기
       
    }
    
    // 아이디 찾기 버튼
    const submitBtn = () => {

    }

    const closeModal = () => {
        setIsOpen(false)
    }
    const loginBtn = () => {
        history.push("/login")
    }

    return (
        <Outer>
            <Form>
                <Div1>
                    <p id="title">아이디 찾기</p>
                    <p>이메일 인증</p>
                </Div1>

                <Div2>
                    <ul>
                        <li>
                            <p>닉네임</p>
                            <input type="text" onChange={ChangeHanlder("findNickName")}></input>
                        </li>
                        <li>
                            <p>이메일</p>
                            <input type="text" onChange={ChangeHanlder("authEmail")}></input>
                            <button onClick={sendEmail}>이메일요청</button>
                        </li>
                        <li>
                            <p>인증코드</p>
                            <input type="text" onChange={ChangeHanlder("authCode")}></input>
                            <button onClick={verification}>인증하기</button>
                        </li>
                    </ul>
                </Div2>
                <Button onClick={findAccountId}>아이디 찾기</Button>
                { isOpen? 
                    (<FindAccountModal
                        closeBtn={closeModal}
                        loginBtn={loginBtn}
                    />
                    ) 
                    : null
                }
                
            </Form>
        </Outer>
    )
}