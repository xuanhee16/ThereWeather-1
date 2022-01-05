import React from "react"
import styled from "styled-components"
import axios from "axios"

const Outer = styled.div`
  background-color: yellowgreen;
`

// 아이디, 댓글내용, 날짜, 좋아요하트, 삭제버튼
export default function Comment() {
  return (
    <Outer>
      <li>댓글1</li>
      <li>댓글2</li>
      <li>댓글3</li>
    </Outer>
  )
}
