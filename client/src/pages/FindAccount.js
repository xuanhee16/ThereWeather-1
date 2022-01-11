import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

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
   
    if (!url) {
        url = "https://thereweather.space/api"
    }

    const [inputFindInfo, setInputFindInfo] =  useState({
        findNickName: "",
        authEmail: "",
        authCode: ""
    })

    function sendEmail() {
      console.log("이메일 전송 버튼")
    }

    function verification() {
      console.log("인증코드 버튼")
    }

    function findAccountId() {
      console.log("아이디 찾기 버튼")
    }
    
    
    // 아이디 찾기 버튼
    const submitBtn = () => {

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
                            <input type="text"></input>
                        </li>
                        <li>
                            <p>이메일</p>
                            <input type="text"></input>
                            <button>인증요청</button>
                        </li>
                        <li>
                            <p>인증코드</p>
                            <input type="text"></input>
                            <button onClick={submitBtn}>인증하기</button>
                        </li>
                    </ul>
                </Div2>
                <Button>아이디 찾기</Button>
            </Form>
        </Outer>
    )
}