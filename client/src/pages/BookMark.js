import React, { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"


export default function BookMark() { 
    const Container = styled.div`
    
      display: grid;
      height: 100vh;
      gap: 4rem;
      margin: 2rem;
      justify-content: center;
	    align-items: center;
      grid-template-rows: 3fr 3fr;
      grid-template-columns: 5fr 5fr;
      grid-template-areas: 
      "div div"
      "div div";
      /* overflow: auto; */
      // (max-width: 600px)
      @media (max-width: 1081px) {
        gap: 2rem;
        grid-template-rows: 2fr 2fr 2fr 2fr;
        grid-template-columns: 5fr;
        grid-template-areas: 
        "div"
        ;
      }
    `;
    
    const BookMarkContainer = styled.div`
      display: flex;
      gap: 0.1rem;
      justify-content: space-around;
      
      .postTitle {
        font-weight: bold;
        font-size: 2.5rem;
      }
      .postDate {
        font-size: 1.5rem;
      }
      .postWeather {
        font-size: 1.5rem;
      }
    `;

    const BookMarkPhoto = styled.div`
      flex-basis: 30rem;
      .postPicture{
        margin: 1rem 2rem;
        padding: 1rem;
        border: solid 1px black;
        height: 25vh;
        align-items: center;
      }
      //사진확인필요 
      /* .img {
        width: 2rem;
        height: 2rem;
      } */
    `;
    
    const BookMarkList = styled.div`
      margin: 1rem;    
      line-height: 2.5rem;
      flex-direction: column;
      flex-basis: 15rem;
      justify-content: flex-start;
    `;
    
    const BookMarkIcon = styled.div`
      flex-direction: column;
      flex-basis: 10.5rem;
      text-align: end;
      margin: 1rem;
      padding: 1rem;
    `;
  
    // const Pagenation = styled(BookMarkContainer)``;
    // const PrevPage = styled.div`
    // `;
    // const NextPage = styled.div`
    // `;

    return (
        <Container>
          <BookMarkContainer>
          <BookMarkPhoto>
            <div className="postPicture">
              {/* <img className="postImg" src={} alt="weather" /> */}
              게시물 날씨 사진
            </div>
          </BookMarkPhoto>
          <BookMarkList>
            <div className="postTitle">
              {/* <div className="title">{}</div> */}
              00구
            </div>
            {/* <div className="postDate">{}</div> */}
            <div className="postDate">10 / 25</div>

            {/* <div className="postWeather">{}</div>
            <div className="postWeather">{}</div>
            <div className="postWeather">{}</div> */}
            <div className="postWeather">날씨 이모티콘1</div>
            <div className="postWeather">날씨 이모티콘2</div>
            <div className="postWeather">날씨 이모티콘3</div>
          </BookMarkList>
          <BookMarkIcon>
            {/* 북마크 버튼 렌더링 필요  */}
			      <FontAwesomeIcon icon={faHeart} />
          </BookMarkIcon>
          </BookMarkContainer>
          <BookMarkContainer>post</BookMarkContainer>
          <BookMarkContainer>post</BookMarkContainer>
          <BookMarkContainer>post</BookMarkContainer>
          {/* <Pagenation>
            <PrevPage>이전</PrevPage>
            <NextPage>다음</NextPage>
          </Pagenation> */}
        </Container>
    )
}