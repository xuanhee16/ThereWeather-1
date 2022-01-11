import React from "react"
import styled from "styled-components"
import axios from "axios"

const Outer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

`
const LeftDiv = styled.div`
  
`
const RightDiv = styled.div`
  border: 1px solid blueviolet;
`
const DeleteBtn = styled.button`
  display: block;
  border: 1px solid black;
`
const LikeBtn = styled.button`
  display: block;
  border: 1px solid red;
`
// 아이디, 댓글내용, 날짜 / 좋아요하트, 삭제버튼
export default function Comment({content, commentDelete}) {
  // console.log("content : ", content);
  return (
    <Outer>
      <LeftDiv>
        <p>{content.comment_user_id}</p>
        <p>{content.comment_content}</p>
        <p>{content.createdAt}</p>
      </LeftDiv>

      <RightDiv>
        <DeleteBtn onClick={() => commentDelete(content.id)}>삭제</DeleteBtn>
        <LikeBtn>하투</LikeBtn>
      </RightDiv>
    </Outer>
  )
}
