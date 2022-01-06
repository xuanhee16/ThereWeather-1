import React from "react"
import styled from "styled-components"
import axios from "axios"

const Outer = styled.div`
height: auto;
`
const LeftDiv = styled.div`
  border: 1px solid brown;
`
const RightDiv = styled.div`
  border: 1px solid blue;
`

// 아이디, 댓글내용, 날짜 / 좋아요하트, 삭제버튼
export default function Comment({content}) {
  // console.log("content : ", content);
  return (
    <Outer>
      <LeftDiv>
        <p>{content.comment_user_id}</p>
        <p>{content.comment_content}</p>
        <p>{content.createdAt}</p>
      </LeftDiv>

      <RightDiv></RightDiv>
    </Outer>
  )
}
