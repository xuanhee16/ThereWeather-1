import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const Outer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #FEF9EF;

`
// 제목, 유저프로필사진,닉네임 북마크버튼
const PostHeader = styled.div`
  background-color: yellowgreen;
`
const Title = styled.div`
  border: 1px solid red;
  /* width: 100vw; */
  height: 10vh;
  padding-top: 4vh;

  // 제목글자수 제한 필요?
  span{
    /* margin-left: 40vh; */
    font-size: 2rem;
  }
`

const BookmarkIcon = styled.div`
  border: 1px solid red;
  margin: 2vh 2vw;
  float: right;
`

const Profile = styled.div`
  border: 1px solid red;

`
const ProfileImg = styled.img`
  border: 1px solid red;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

`



// 게시물 사진 (inline)
const PostImg = styled.img`
  border: 1px solid red;

`
// 날씨,바람세기,온도
const WeatherInfo = styled.div`

`

// 오늘의 코디 (있을 때, 없을 때)
const TodayCodi = styled.div`

`

// 게시물 내용
const Post = styled.div`

`

// 삭제, 수정 버튼
const Buttons = styled.div`

`

export default function PostRead(){
  return (
    <Outer>
      <PostHeader>
      <BookmarkIcon>
        <FontAwesomeIcon icon={faHeart} size="2x" className="heart"/>
      </BookmarkIcon>
        <Title>
          <span>{'오늘 날씨 맑음~~'}</span>
        </Title>

        <Profile>
          <ProfileImg/>
          <span>{'김코딩'}</span>
          <span>{'2021. 10. 19.  15:24'}</span>
        </Profile>
      </PostHeader>

      <PostImg />

      <WeatherInfo></WeatherInfo>

      <TodayCodi></TodayCodi>

      <Post></Post>

      <Buttons>

      </Buttons>
    </Outer>
  )
}