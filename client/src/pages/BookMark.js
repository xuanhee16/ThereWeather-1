import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
//import { updateCurrentPage, updateStartEndPage } from "../actions/index"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE } from "../actions/index"

const Outer = styled.div`

  background-color: var(--page-bg-color);
  width: 100vw;
  min-height: 100vh;

  @media screen and (max-width: 1081px) {
    padding-top: 3vh;
  }
`

// 그리드
const Container = styled.div` 
  display: grid;
  /* height: 83vh; */
  gap: 4rem;
  margin-left: 2vh;
  margin-right: 2vh;
  
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
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 5fr;
    grid-template-areas: 
    "div"
    ;
  }
`;
  
const BookMarkContainer = styled.div`
  border: 1px solid red;
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

  @media screen and (max-width: 1081px) {
    .postPicture{
      height: 20vh;
    }
  }
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
`

// 페이지네이션
const Pagination = styled.div`

  background-color: var(--page-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  /* margin: 2rem; */
  list-style: none;
  h4 {
    font-size: 1rem;
  }
  @media screen and (max-width: 1081px) {
    margin-top: 2vh;
  }
`;


const PrevPage = styled.div``

const PageNumber = styled.div`
    li {
        float: left;
        margin: 1.5rem;
    }
`


export default function BookMark() { 
  // 페이지네이션
  const state = useSelector(state => state.itemReducer);
  const { start, end, current } = state; 
  const dispatch = useDispatch();
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

  return (
    <Outer>
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
              <h4>이전</h4>
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
              <h4>다음</h4>
            </button>
          </li>
        </NextPage>
      </Pagination>
    </Outer>
  )

}
