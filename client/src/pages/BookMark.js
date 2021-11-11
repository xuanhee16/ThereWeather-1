import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
//import { updateCurrentPage, updateStartEndPage } from "../actions/index"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, userPosts, updatePostId } from "../actions/index"
import { useHistory } from "react-router"
// import Pagination from "../components/Pagination"

const Outer = styled.div`
  background-color: var(--page-bg-color);
  width: 100vw;
  min-height: 100vh;
  padding-top: 100px;

  @media screen and (max-width: 1081px) {
    padding-top: 3vh;
  }
`

// 그리드
const Container = styled.div` 
  display: grid;
  /* height: 83vh; */
  gap: 3rem;
  margin-left: 3vw;
  margin-right: 3vw;
  
  justify-content: center;
  align-items: center;
  grid-template-rows: 3fr 3fr;
  /* grid-template-columns: 5fr 5fr; */
  grid-template-areas: 
  "div div"
  "div div";
  /* overflow: auto; */
  // (max-width: 600px)

  @media (max-width: 1081px) {
    gap: 2rem;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    /* grid-template-columns: 5fr; */
    grid-template-areas: 
    "div"
    ;
  }
`;

const BookMarkContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  gap: 0.1rem;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
`;
// 게시물 사진
const BookMarkPhoto = styled.div`
  flex-basis: 30rem;
  .postPicture{
    margin: 1rem 2rem 1rem 1rem;
    padding: 0;
    /* border: solid 1px black; */
    height: 25vh;
    align-items: center;
  }
  .postImg {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1081px) {
    .postPicture{
      height: 20vh;
    }
  }
  @media screen and (max-width: 375px) {
    .postPicture{
      margin: 0;
    }
  }
`;
// 00구,날짜,날씨이모티콘
const BookMarkList = styled.div`
  margin: 1rem;    
  line-height: 3rem;
  flex-direction: column;
  flex-basis: 15rem;
  justify-content: flex-start;

  .postTitle {
    font-weight: bold;
    font-size: 2rem;
  }
  .postDate {
    font-size: 1.5rem;
  }
  .postWeather {
    /* font-size: 1.5rem; */
    width: 3rem;
    height: 3rem;
  }
  img{
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1081px) {
    line-height: 2rem;
    .postTitle {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .postDate {
      font-size: 1rem;
    }
    .postWeather {
      font-size: 0.5rem;
      width: 30px;
      height: 30px;
    }
  }
  @media screen and (max-width: 375px) {
    margin: 0.1rem 0 0 0.5rem;
    line-height: 1.4rem;
    .postTitle {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .postDate {
      font-size: 1rem;
    }
    .postWeather {
      font-size: 0.5rem;
      width: 30px;
      height: 30px;
    }
  }
`;
// 북마크 아이콘
const BookMarkIcon = styled.div`
  flex-direction: column;
  flex-basis: 10.5rem;
  text-align: end;
  margin: 1rem;
  color: #ED4956;

  @media screen and (max-width: 375px) {
    margin: 0;
    padding: 0 0.3rem 0 0;
    font-size: 10px;
  }
`

// 페이지네이션
const Pagination = styled.div`
  background-color: #FAFAFA;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  /* margin: 2rem; */
  list-style: none;
  
  button{
    font-size: 1.5rem;
    margin: 0 1vw;;
  }

  @media screen and (max-width: 1081px) {
    margin-top: 2vh;
  }

  @media screen and (max-width: 375px) {
    margin-top: 5vh;
    padding-bottom: 3vh;
    button{
      font-size: 1rem;
    }
  } 
`


const PrevPage = styled.div``

const PageNumber = styled.div`
  li {
    float: left;
    margin: 1rem;
  }
  button{
    font-size: 1.5rem;
  }
  @media screen and (max-width: 375px) {
    li{
      margin: 0;
    }
    button{
      margin: 0 2vw;
      font-size: 1rem;
    }
  }
`

const NextPage = styled.div``;


let url = process.env.REACT_APP_LOCAL_URL
if (!url) url = "https://thereweather.space"

export default function BookMark() { 
  const dispatch = useDispatch()
  const history = useHistory()
  const { userInfo, readPostId } = useSelector((state) => state.itemReducer)
  const [bookmarkList, setBookmarkList] = useState()
  console.log(userInfo)
  console.log(readPostId)

  //bookmark는 유저1이 저장해둔 포스트 목록이 나오게 
  //일단 유저정보를 보내서, 그 유저가 북마크에 저장한 내용 싹 보여주기 

  
  useEffect(() => {
    axios({
      url: url + `/bookmarklist?searchPost=${userInfo.user_id}`
    })
    .then((res) => {
      console.log(res.data)
      setBookmarkList(res.data)
    })
  },[])

  //console.log(bookmarkList)

  const formatDate = (dateString) => {
    // 예시 : 2021. 11. 5. 22:02
    const dateObject = new Date(dateString);
    let dateOnly = dateObject.toLocaleDateString();
    return `${dateOnly}`
  }

  const postClickHandler = (e) => {
    //"PostBookMarkList"
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


  // 페이지네이션
  const state = useSelector(state => state.itemReducer);
  const { start, end, current } = state; 

  // const updateCurrentPages = dispatch(updateCurrentPage);
  // const updateStartEndPages = dispatch(updateStartEndPage);
  const updateCurrentPages = page => (dispatchs) => {
    dispatch({ type: UPDATE_CURRENT_PAGE, payload: page })
  }
  const updateStartEndPages = (start, end) => (dispatchs) => {
    dispatch({ type: UPDATE_START_END_PAGE, payload: { start, end } })
  }

  const per = 4
  //테스트중 갯수 20개로 고정
  const total = Math.ceil(20 / per)

  const arr = []
  for (let i = 0; i < total; i++) {
      arr.push(i + 1)
  }
  const target = arr.slice(start, end)

  /*  페이지네이션 시작
  const [ currentPage, setCurrentPage ] = useState(1);
    // 1페이지로 시작
  const itemsPerPage = 8;
    // 한 페이지에 8개씩 보여준다
  const lastIdx = currentPage * itemsPerPage;
  const firstIdx = lastIdx - itemsPerPage;
  const slicedData = (dataArr) => {
    return dataArr.slice(firstIdx, lastIdx);
  }

  // jsx
  <Pagination
    dataLength={currentPosts.length}
    itemsPerPage={itemsPerPage}
    numberButtonClickHandler={setCurrentPage}
  />
  페이지네이션 끝 */

  return (
    <Outer>
      <Container>
        <BookMarkContainer className="PostBookMarkList">
          <BookMarkPhoto>
            <div className="postPicture">
              {/* <img className="postImg" src={`${process.env.PUBLIC_URL}img/sky.png`} alt="weather" /> */}
              {bookmarkList && bookmarkList.map((el) => <div className={["postImg", "postItem"]} id={el.id} onClick={postClickHandler} key={el.id}><img src={el.post_photo} alt="posts" /></div>)}
            </div>
          </BookMarkPhoto>
          <BookMarkList>
            {/* <div className="postTitle">
              00구
            </div> */}
            {/* <div className="postDate">10 / 25</div> */}
            {bookmarkList && bookmarkList.map((el) => <div className="postDate" key={el.id}>{formatDate(el.createdAt)}</div>)}
            <div className="postWeather sky">
              {/* <img src={`${process.env.PUBLIC_URL}img/icons-write/sunny.png`}></img> */}
              {bookmarkList && bookmarkList.map((el) => <div className="postDate" key={el.id}>{el.weather}</div>)}
            </div>
            <div className="postWeather wind">
              {/* <img src={`${process.env.PUBLIC_URL}img/icons-write/windy.png`}></img> */}
              {bookmarkList && bookmarkList.map((el) => <div className="postDate" key={el.id}>{el.wind}</div>)}
            </div>
            <div className="postWeather temp">
              {/* <img src={`${process.env.PUBLIC_URL}img/icons-write/hot.png`}></img> */}
              {bookmarkList && bookmarkList.map((el) => <div className="postDate" key={el.id}>{el.temp}</div>)}
            </div>
          </BookMarkList>
          <BookMarkIcon>
            {/* 북마크 버튼 렌더링 필요  */}
            <FontAwesomeIcon icon={faHeart} size="2x"/>
          </BookMarkIcon>
        </BookMarkContainer>


        {/* <Pagenation>
          <PrevPage>이전</PrevPage>
          <NextPage>다음</NextPage>
        </Pagenation> */}
      </Container>

      <Pagination>
        <PrevPage>
          <li className="prevPage">
            <button className="previousPages" onClick={() => {
              if(current === 1) return alert('첫번째 페이지입니다')
              if(current % 10 === 1) {
                const s = start - 10;
                const e = end - 10;
                updateStartEndPages(s, e);
              }
              updateCurrentPages(current - 1);
            }}>
              이전
            </button>
          </li>
        </PrevPage>

        <PageNumber>
        {target.map(el => (
          <li className="pageNum" key={el}>
            <button className="pageNumbers" onClick={() => {updateCurrentPages(el)}}>
              {el}
            </button>
          </li>
        ))}
        </PageNumber>
        
        <NextPage>
        <li className="nexPage">
            <button className="nextPages" onClick={() =>{
              if(current % 10 === 1) {
                const s = start - 10;
                const e = end - 10;
                updateStartEndPages(s, e);
              }
              updateCurrentPages(current + 1);
            }}>
              다음
            </button>
          </li>
        </NextPage>
      </Pagination>
    </Outer>
  )


}