import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Outer = styled.div`
  width: 100%;
  margin: 1rem 0;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E0E0E0;

`
const LeftDiv = styled.div`
  text-align: left;
  .userid {
    font-size: 1.1rem;
  }
  .comment {
    font-size: 1rem;
  }
  .date {
    font-size: 0.8rem;
    color: #777;
  }
`
const RightDiv = styled.div`
  display: block;
`
const DeleteBtn = styled.button`
  display: block;
  border: 1px solid black;
`
const LikeBtn = styled.button`
  display: block;
  margin-top: 0.3rem;
  border: 1px solid black;
`

let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

// 아이디, 댓글내용, 날짜 / 좋아요하트, 삭제버튼
export default function Comment({content, commentDelete, userInfo}) {
  console.log("댓글작성한 유저", content);
  const [click, setClick] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  let date = new Date(`${content.createdAt}`)
  let dateForm = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}. ${date.getHours()}:${date.getMinutes()}`
  // console.log("date format : ", dateForm);
  console.log("현재 접속중인유저", userInfo);

  // 댓글 좋아요 클릭
  const commentLike = () => {
    axios({
      url: url + "/likecomment",
      method: "post",
      data: {
        user_id: userInfo.user_id, //좋아요를 누른 현재 접속중인 유저 
        post_id: content.post_id,
        comment_id: content.comment_user_id, //현재 접속중인 유저가 좋아요를 누른 댓글을 작성한 유저
        like_count: 0
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.totalCount)
      console.log(res.data.user_id)//현재접속중인유저인데 좋아요 누름
      console.log(res.data.comment_id)//댓글 작성유저 
      console.log(res.data.like_count) 
      // console.log(res.data.length) 
      // const count = res.data
      // const totalCounts = count.map(el => el.like_count).reduce((pre, cur) => pre + cur, 0); 

      const totalCounts = res.data.totalCount.length
      
      setLikeCount(totalCounts)
      setClick(!click)     
      // if(click === false){
      //   setClick(true)
      // }else{
      //   setClick(false)
      // }

    })
  }

  // useEffect(() => {    
  //   axios({
  //     url: url + "/readlike",
  //     method: "post",
  //     data:{
  //       user_id: userInfo.user_id,//현재 접속중인 유저 Id
  //       post_id: content.post_id,
  //       comment_id: content.comment_user_id, //댓글 작성한 유저 Id
  //     },
  //     headers: { "Content-Type": "application/json" },
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     console.log(res.data)
  //     const totalCounts = res.data.length
  //     setLikeCount(totalCounts)
  //      setClick(!click)
  //   })
  // }, [])

  // useEffect(() => {}, []);


  return (
    <Outer>
      <LeftDiv>
        <p className="userid">{content.comment_user_id}</p>
        <p className="comment">{content.comment_content}</p>
        <p className="date">{dateForm}</p>
      </LeftDiv>

      <RightDiv>
        <DeleteBtn onClick={() => commentDelete(content.id)}>삭제</DeleteBtn>
        <LikeBtn 
          onClick={commentLike}
          // onClick={() => commentLike(content.id)}
        >
          {
            click? 
              <FontAwesomeIcon 
              icon={faHeart}
              className="heart"
              color="red"
              /> :
              <FontAwesomeIcon 
              icon={faHeart}
              className="heart"
              color="#aaa"
              />
          }
          <span>{likeCount}</span>
        </LikeBtn>
      </RightDiv>
    </Outer>
  )
}
