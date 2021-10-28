import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTshirt, faSun, faWind, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";

const Outer = styled.div`
  width: 100vw;
  background-color: #FEF9EF;

  // 오늘의 코디
  .todayCodi{
    margin: 0 auto;
    width: 150px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #2E2E2E;
  }
  @media screen and (max-width: 1081px) {
    .todayCodi{
      font-size: 15px;
      font-weight: bold;
    }
  }
`
// 제목, 유저프로필사진,닉네임 북마크버튼
const PostHeader = styled.div`
  padding-top: 8vh;
  align-items: center;

  @media screen and (max-width: 1081px) {
    padding-top: 5vh;
  }
`
// 제목
const Title = styled.div`
  width: 60rem;
  text-align: center;
  margin: 0 auto;

  // 제목글자수 제한 필요?
  span{
    font-size: 2.5rem;
  }

  @media screen and (max-width: 1081px) {
    width: 80%;
  }
`
// 북마크 아이콘
const BookmarkIcon = styled.div`
  float: right;
`

// 프로필
const Profile = styled.div`
  width: 60rem;
  margin: 0 auto;
  margin-top: 2vh;
  align-items: center;
  display: flex; 
  
  .profileInfo{
    margin-left: 1vh;
  }
  span{
    margin-left: 1vh;
  }

  @media screen and (max-width: 1081px) {
    width: 50rem;
  }
`
// 프로필 이미지
const ProfileImg = styled.img`
  border: 1px solid grey;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`

// 게시물 사진 (있을 때, 없을때)
const PostImg = styled.img`
  border: 1px solid grey;
  // 이미지 사이즈(1000*750) 
  // 다시 확인필요
  width: 60rem;
  height: 40rem;
  display: block;
  margin: 3vh auto;

  @media screen and (max-width: 1081px) {
    width: 70%;
    height: 30rem;
  }
`
// 날씨,바람세기,온도
const WeatherInfo = styled.div`
  width: 330px;
  margin-top: 4vh;
  display: flex;
  margin: 0 auto;
  margin-bottom: 2vh;
  justify-content: space-between;

  div{
    /* border: 1px solid grey; */
    width: 100px;
    height: 100px;
    text-align: center;
  }

  @media screen and (max-width: 1081px) {
    /* width: 20%; */
    margin-top: 1vh;
    margin-bottom: 1vw;

    div{
      /* width: 80px;
      height: 80px; */
      text-align: center;
    }
  }
`

// 오늘의 코디 (있을 때, 없을 때)
const TodayCodi = styled.div`
  width: 210px;
  text-align: center;
  display: flex;
  margin: auto;
  margin-top: 2vh;
  margin-bottom: 3vh;

  .codi{
    width: 100px;
    height: 100px;
  }
  .codi:nth-child(2){
    margin-left: 1vh;
  }

  @media screen and (max-width: 1081px) {
    width: 160px;
    height: 80px;
    margin-top: 1vh;
    margin-bottom: 3vh;
    .codi{
      width: 80px;
      height: 80px;
    }
  }
`

// 게시물 내용 scroll
const Post = styled.div`
  margin: 0 auto;
  margin-bottom: 5vh;
  width: 60rem;

  @media screen and (max-width: 1081px) {
    width: 70%;
    /* height: 300px;
    overflow: scroll; */
  }
`

// 삭제, 수정 버튼
const Buttons = styled.div`
  width: 15rem;
  margin: 0 auto;
  padding-bottom: 5vh;

  button{
    width: 5rem;
    height: 3rem;
    border-radius: 5px;
    background-color: var(--button-bg-normal);
    font-size: 1.2rem;
  }
  button:nth-child(2){
    margin-left: 5rem;
  }
  button:before{
    height: 0%;
    width: 2px;
  }
  button:active{
    border: none;
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
  }
`

export default function PostRead(){
  return (
    <Outer>
      <PostHeader>
        <Title>
          <BookmarkIcon>
          <FontAwesomeIcon icon={faHeart} size="2x" className="heart"/>
          </BookmarkIcon>
          <span>{'오늘 날씨 맑음'}</span>

        </Title>

        <Profile>
          <ProfileImg src="img/blankProfile.png"/>
          <div className="profileInfo">
            <span className="nickName">{'김코딩'}</span>
            <span className="date">{'2021. 10.19. 15:24'}</span>
          </div>
        </Profile>
      </PostHeader>
      <PostImg/>

      <WeatherInfo>
        <div>
          <FontAwesomeIcon icon={faSun} size="4x"/>
        </div>
        <div>
          <FontAwesomeIcon icon={faWind} size="4x"/>
        </div>
        <div>
          <FontAwesomeIcon icon={faThermometerHalf} size="4x"/>
        </div>
      </WeatherInfo>
      
      <p className="todayCodi">오늘의 코디</p>
      <TodayCodi>
        <div className="codi">
          <FontAwesomeIcon icon={faTshirt} size="5x" color="purple"/>
        </div>
        <div className="codi">
          <FontAwesomeIcon icon={faTshirt} size="5x" color="pink"/>
        </div>
      </TodayCodi>

      <Post>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
          containing Lorem Ipsum passages, and more recently with desktop publishing software like 
          Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
          containing Lorem Ipsum passages, and more recently with desktop publishing software like 
          Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
          containing Lorem Ipsum passages, and more recently with desktop publishing software like 
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </Post>

      <Buttons>
        <button>삭제</button>
        <button>수정</button>
      </Buttons>
    </Outer>
  )
}