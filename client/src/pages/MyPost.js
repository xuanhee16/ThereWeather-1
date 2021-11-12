import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, userPosts, updatePostId } from "../actions/index"
import GoBackButton from "../components/GoBackButton"
import Pagination from "../components/Pagination"

/*
  [수정]
  - 레이아웃 고치다가 중단함
  - 페이지네이션 컴포넌트 추가함
*/

const Outer = styled.div`
  background-color: var(--page-bg-color);
  width: 100vw;
  /* height: 100vh; */
  min-height: 100vh;
  padding-top: 100px;
  button{
    font-size: 1.5rem;
  }

  @media screen and (min-width: 1500px) {
    padding-left: 3vh;
    padding-right: 3vh;
  }
  @media screen and (max-width: 375px) {
    padding-top: 2vh;
  }
  @media screen and (max-width: 1081px) {
    /* height: auto; */
  }
`

// 내가 쓴 글 (grid)
const GridArea = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 300px 300px ;
    grid-gap: 1.5rem;
    height: 70vh;
    p{
      font-size: 28px;
    }

    .postItem {
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
    }
    .postItem:hover {
    }
    
    @media screen and (min-width: 2100px) {
        height: 50vh;
        width: 300px;
    }
    @media screen and (max-width: 1081px) {
      padding-left: 5vw;
      padding-right: 5vw;
      height: auto;
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 600px) {
      padding-left: 2vw;
      padding-right: 2vw;
      p{
        font-size:20px
      }
    }
    @media screen and (max-width: 375px) {
      height: auto;
    }
`

// 게시물 사진
const PostImg = styled.img`
  width: 100%;
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
// const PostInfo = styled.div`
//   width: 50%;
//   padding: 3vh 2vw 2vh 2vw;
//   font-size: 2rem;
//   align-items: center;
//   p{
//     margin-top: 10px;
//   }

//   @media screen and (max-width: 1081px) {
//     padding: 1vh 2vw 2vh 2vw;
//     font-size: 1.5rem;
//   }
//   @media screen and (max-width: 375px) {
//     font-size: 1rem;
//     padding-left: 3vw;
//   }
// `

// 페이지네이션
const Page = styled.div`
    display: flex;
    justify-content: center;
    li {
      /* margin: 3px; */
      list-style: none;
      padding: 3px;
      /* border: 1px solid red; */
    }
    button {
      margin: 0 1vw;
      padding: 1rem 1.5rem;
      border-radius: 50%;
    }
    button:focus{
      background-color: var(--modal-bg-color);
    }
    #prev,
    #next{
      background: none;
    }
    @media screen and (max-width: 1081px) {
      margin-top: 10rem;
      padding-bottom: 5rem;

    }

    @media screen and (max-width: 375px) {
      margin-top: 3rem;
      padding-bottom: 3rem;
      li {
        /* margin: 0 1vw; */
        /* margin: 1vh; */
        padding: 0;

      }
      button {
        /* margin: 0 1.5vw; */
        font-size: 1.5rem;
        margin: 0;
        padding: 1px 7px;
      }
    }
`
let url = process.env.REACT_APP_LOCAL_URL

export default function MyPost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { start, end, current, isLogin, userInfo, postInfo, readPostId } = useSelector((state) => state.itemReducer)
  console.log(postInfo)
  console.log(readPostId)
 
  const updateCurrPage = page => (dispatchs) => {
    dispatch({ type : UPDATE_CURRENT_PAGE, payload: page })
  }
  const updateStartEndPage = (start, end) => (dispatchs) => {
    dispatch({type: UPDATE_START_END_PAGE, payload: {start, end}})
  }
  const [currentPosts, setcurrentPosts] = useState([])

  useEffect(() => {
    axios({
        url: url + `/mypost?searchID=${userInfo.user_id}`,
        method: "get",
        withCredentials: true,
    }).then((res) => {
        //console.log(res.data)
        setcurrentPosts(res.data)
        dispatch(userPosts(res.data))
    }) 
}, [])

// 게시물사진 클릭했을 때
const postClickHandler = (e) => {
  // console.log(e.target.id);
  // history.push("/postread")
  // history.push({
  //     pathname: 'postread',
  //     search: `?searchID=${userInfo.user_id}`,
  //     state: {data: postInfo.postinfo}
  // })
  // 해당 게시물의 id, user_id

  let elem = e.target;
  while(!elem.classList.contains("postItem")) {
      elem = elem.parentNode;
      if(!elem.classList.contains("myPostList")) {
          break;
      }
  }

  dispatch(updatePostId(elem.id));
  history.push({
      pathname: '/postread',
      state: {postId: elem.id}
  });
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
      <GridArea className="myPostList">
        {/* <div className="item"> */}
          {/* <PostImg src={`${process.env.PUBLIC_URL}img/sky.png`} alt="weather"/> */} 
          {currentPosts.map((el) => 
            <div className={["postItem"]} id={el.id} onClick={postClickHandler} key={el.id}>
              <PostImg src={el.post_photo} alt="posts"/>
            </div>)}
          {/* <PostInfo>
            <p>{'서울시 종로구'}</p>
            <p>{'10/19'}</p>
            <p>날씨 : {'맑음'}</p>
            <p>바람 : {'조금'}</p>
            <p>온도 : {'따뜻함'}</p>
          </PostInfo> */}
        {/* </div> */}
      </GridArea>

      {/* 페이지네이션 테스트 */}
      <Pagination
        dataLength={100}
        unit={5}
        // numberButtonClickHandler={}
      />

      {/* 페이지네이션이나 무한스크롤 */}
      <Page>
        <li className="page-item">
          <button
            id="prev"
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
            id="next"
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

