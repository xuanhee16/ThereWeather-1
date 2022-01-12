// 아이디 찾기 모달
import React from 'react';
import styled from "styled-components"

const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-bg-color);
  z-index: 200;
`
const Popup = styled.div`
  justify-content: space-around;
  align-items: center;
  width: 50vw;
  min-width: 300px;
  max-width: 500px;
  height: 40vw;
  min-height: 200px;
  max-height: 300px;
  background-color: var(--modal-confirm-bg);
  font-size: 1.5rem;
  border-radius: 1.5rem;
  text-align: center;

`
const Div1 = styled.div`
  margin: 1rem auto 0 auto;
  height: 3rem;
  width: 90%;
  text-align: end;
  button {
    border: 1px solid black;
    height: 2rem;
    width: 2rem;
    border-radius: 10px;
  }
`
const Div2 = styled.div`
  line-height: 2rem;
  margin: 2rem 0;
  p {
    font-size: 1.3rem;
  }
  #info {
    font-size: 1rem;
  }
`
const Div3 = styled.div`
  button {
    font-size: 1.2rem;
    height: 3rem;
    padding: 0 1rem;
    background-color: pink;
    border-radius: 10px;
    &:hover {
      background-color: #ff7f9f;
      color: white;
    }
  }
`

export default function FindAccountModal({closeBtn, loginBtn}) {
  const loginButtonClick = () => {
    loginBtn();
  }
  const closeButtonClick = () => {
    closeBtn();
  }

  return (
    <Outer>
      <Popup>
        <Div1><button onClick={closeButtonClick}>X</button></Div1>
        <Div2>
          <p>인증이 완료되었습니다.</p>
          <p id="info">
            {}님의 아이디는 {} 입니다.
          </p>
        </Div2>
        <Div3 >
          <button onClick={loginButtonClick}>로그인하러가기</button>
        </Div3>
      </Popup>
    </Outer>
  )
}