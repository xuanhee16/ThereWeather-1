import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE } from "../actions/index"
import GoBackButton from  "../components/GoBackButton"


const Outer = styled.div`
  background-color: var(--page-bg-color);
  width: 100vw;
  /* height: 100vh; */
  min-height: 100vh;
  padding-top: 200px; // Header.js에 가려져서 추가함

  @media screen and (max-width: 1081px) {
    padding-top: 250px;  // Header.js에 가려져서 추가함
    padding-bottom: 100px; // MenuBar에 가려져서 추가
  }

  button{
    font-size: 1.5rem;
  }
`

// 내가 쓴 글 (grid)
const GridArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
	grid-template-rows: 300px 300px;
  grid-gap: 1.5rem;
  height: 70vh;

  .item{
    /* border: 1px solid blue; */
    display: flex;
  }
  .item:nth-child(odd){
    margin-left: 5vw;
  }
  .item:nth-child(even){
    margin-right: 5vw;
  }
  .item:hover{
  }

  @media screen and (min-width: 2100px){
    height: 50vh;

    .item:nth-child(odd){
      margin-left: 30vw;
    }
    .item:nth-child(even){
      margin-right: 30vw;
    }
  }
  @media screen and (max-width: 1081px) {
    grid-template-columns: 1fr;
    grid-template-rows: 3fr 3fr 3fr 3fr;

    .item:nth-child(odd),
    .item:nth-child(even){
      margin: 0 2vw;
    }
  }
`
// 게시물 사진
const PostImg = styled.img`
  width: 50%;
  height: 100%;
  background-color: #FFFFFF;

  @media screen and (min-width: 2100px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 1081px) {
    // 이미지 크기 수정 필요
  }
`
// 게시물 내용
const PostInfo = styled.div`
  width: 50%;
  padding: 3vh 2vw 2vh 2vw;
  font-size: 2rem;
  align-items: center;
  p{
    margin-top: 10px;
  }

  @media screen and (max-width: 1081px) {
    padding: 1vh 2vw 2vh 2vw;
    font-size: 1.5rem;
  }
`

// 페이지네이션
const Page = styled.div`
  display: flex;
  justify-content: center;
  li {
    list-style: none;
  }
  button{
    margin: 0 1vw;
  }

  @media screen and (min-width: 2100px){
  }

  @media screen and (max-width: 1081px) {
    margin-top: 10rem;
  }
`

export default function MyPost() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.itemReducer)
  const { start, end, current } = state;
  const updateCurrPage = page => (dispatchs) => {
    dispatch({ type : UPDATE_CURRENT_PAGE, payload: page })
  }
  const updateStartEndPage = (start, end) => (dispatchs) => {
    dispatch({type: UPDATE_START_END_PAGE, payload: {start, end}})
  }

  // 페이지별 담는 글 갯수
  const per = 4;

  // 총 몇개 페이지가 필요한지?
  const total = Math.ceil(20 / per);
  // total의 갯수만큼 각 페이지번호가 있는 박스들을 생성하기 위한 mapping을 위한 배열
  const array = [];
  for(let i = 0; i < total; i++){
    array.push(i + 1);
  }
  // 총페이지가 10페이지가 넘을 경우에 10개씩 자른다.
  const target = array.slice(start, end)

  return (
    <Outer>
      <GoBackButton/>
      <GridArea>
        <div className="item">
          <PostImg/>
          <PostInfo>
            <p>{`10/19`}</p>
            <p>날씨 : {'맑음'}</p>
            <p>바람 : {'조금'}</p>
            <p>온도 : {'따뜻함'}</p>
          </PostInfo>
        </div>
        <div className="item">
          <PostImg/>
          <PostInfo>
            <p>{}</p>
            <p>날씨 : {}</p>
            <p>바람 : {}</p>
            <p>온도 : {}</p>
          </PostInfo>
        </div>
        <div className="item">
          <PostImg/>
          <PostInfo>
            <p>{}</p>
            <p>날씨 : {}</p>
            <p>바람 : {}</p>
            <p>온도 : {}</p>
          </PostInfo>
        </div>
        <div className="item">
          <PostImg/>
          <PostInfo>
            <p>{}</p>
            <p>날씨 : {}</p>
            <p>바람 : {}</p>
            <p>온도 : {}</p>
          </PostInfo>
        </div>
      </GridArea>

      {/* 페이지네이션이나 무한스크롤 */}
      <Page>
        <li id="prev" className="page-item">
          <button
            className="item page-link"
            onClick={() => {
              if(current === 1) return alert('첫번째 페이지 입니다.')
              if(current % 10 === 1){
                const s = start - 10;
                const e = end - 10;
                updateStartEndPage(s, e);
              }
              updateCurrPage(current - 1);
            }}
          >
            이전
          </button>
        </li>

        {target.map(el => (
          <li className="page-item" key={el}>
            <button
              className="item page-link"
              onClick={() => {
                updateCurrPage(el)
              }}
            >
              {el}
            </button>
          </li>
        ))}

        
        <li className="page-item">
          <button
            className="item page-link"
            onClick={() => {
              if(current % 10 === 1){
                const s = start - 10;
                const e = end - 10;
                updateStartEndPage(s, e);
              }
              updateCurrPage(current + 1);
            }}
          >
            다음
          </button>
        </li>
      </Page>
    </Outer>
  )
}