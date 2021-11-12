import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import styled from "styled-components"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { Bookmark } from "../components/Heart";
//import { updateCurrentPage, updateStartEndPage } from "../actions/index"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, updatePostId } from "../actions/index"
import { useHistory } from "react-router"

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
  grid-template-columns: 5fr 5fr;
  grid-template-areas: 
  "div div"
  "div div";
  /* overflow: auto; */
  // (max-width: 600px)
  .BookMarkContainer{
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    gap: 0.1rem;
    justify-content: space-around;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
  }

  @media (max-width: 1081px) {
    gap: 2rem;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    /* grid-template-columns: 5fr; */
    grid-template-areas: 
    "div"
    ;
  }
`;

// const BookMarkContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.6);
//   display: flex;
//   gap: 0.1rem;
//   justify-content: space-around;
//   border: 1px solid #dbdbdb;
//   border-radius: 3px;
// `;
// 게시물 사진
const BookMarkPhoto = styled.div`
  flex-basis: 30rem;
  .postPicture{
    margin: 1rem 2rem 1rem 1rem;
    padding: 0;
    border: solid 1px black;
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

const BookMarkIcon = styled(Bookmark)`
  float: right;

  & .heart{
    cursor: pointer;
    color: #aaa;
  }
`

//북마크가 없습니다.
const Waring = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
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
  const { userInfo, readPostId, postInfo } = useSelector((state) => state.itemReducer)
  const [bookmarkList, setBookmarkList] = useState()

  console.log(userInfo)
  console.log(readPostId)
  console.log(postInfo)
  const postId = Number(readPostId)
  console.log(postId)

  
  useEffect(() => {
    axios({
      // url: url + `/bookmarklist?searchID=${userInfo.user_id}&&searchPost=${postId}`,
      // url: url + `/bookmarklist?searchID=${userInfo.user_id}`,
      // method: "get",
      url: url + "/bookmarklist",
      method: "post",
      data: {
        user_id: userInfo.id,
        post_id: postId,
        post_info: postInfo,
      },
      headers: {  "Content-Type": "application/json" },
      withCredentials: true,
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
        // pathname: '/postread',
        pathname: '/bookmarkpost',
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

  // console.log(bookmarkList)


  return (
    <Outer>
      {/* {bookmarkList === [] ?
      <Waring>"북마크가 없습니다."</Waring> : */}
      <Container>
      {bookmarkList && bookmarkList.map((el) => {
        return (
          <div className="BookMarkContainer" key={el.id}>
            <BookMarkPhoto>
            <div className={["postItem"]} id={el.id} onClick={postClickHandler} key={el.id}>
              <img className="postImg" key={el.id} src={el.post_photo} alt="posts" />
            </div> 
            </BookMarkPhoto>
            <BookMarkList>
              <div className="test" key={el.id}>
              <p className="postDate">{formatDate(el.createdAt)}</p>
              <p className="postWeather sky"> {el.weather} </p>
              <p className="postWeather wind">{el.wind} </p>
              <p className="postWeather temp">{el.temp} </p>
              </div>
            </BookMarkList>
          </div>
        )
      })}
      </Container>
      {/* : <Waring>"북마크가 없습니다."</Waring>} */}
      

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