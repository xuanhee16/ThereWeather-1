import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Outer = styled.div`
  width: 100%;
  margin: 1rem 0;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
`;
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
`;
const RightDiv = styled.div`
  display: block;
`;
const DeleteBtn = styled.button`
  display: block;
  border: 1px solid black;
  font-family: "Gowun Dodum", sans-serif;
`;
const LikeBtn = styled.button`
  display: block;
  margin-top: 0.3rem;
  border: 1px solid black;
`;

let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

// 아이디, 댓글내용, 날짜 / 좋아요하트, 삭제버튼
export default function Comment({ content, commentDelete, userInfo }) {
  console.log("댓글작성한 유저", content);
  const [click, setClick] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  let date = new Date(`${content.createdAt}`);
  let dateForm = `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()}. ${date.getHours()}:${date.getMinutes()}`;
  // console.log("date format : ", dateForm);
  console.log("현재 접속중인유저", userInfo);

  // 댓글 좋아요 클릭
  const commentLike = () => {
    axios({
      url: url + "/likecomment",
      method: "post",
      data: {
        user_id: userInfo.user_id,
        comment_id: content.id,
        post_id: content.post_id,
      },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data)
      setClick((data) => !data);
    });
  };

  useEffect(() => {
    axios({
      url: url + "/readlike",
      method: "post",
      data: {
        user_id: userInfo.user_id,
        comment_id: content.id,
        post_id: content.post_id,
      },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data)
      if (res.data !== "댓글 좋아요 없음") {
        setClick(!click);
      }
    });
  }, []);

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
          {click ? (
            <FontAwesomeIcon icon={faHeart} className="heart" color="red" />
          ) : (
            <FontAwesomeIcon icon={faHeart} className="heart" color="#aaa" />
          )}
          <span>{click}</span>
        </LikeBtn>
      </RightDiv>
    </Outer>
  );
}
