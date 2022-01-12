// 아이디, 비밀번호 찾기 모달
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


`

export default function ModalFind() {
  return (
    <Outer>
      <Popup>
        <p>인증이 완료되었습니다.</p>
        <p>
          {000}님의 아이디는 {000} 입니다.
        </p>
      </Popup>
    </Outer>
  )
}