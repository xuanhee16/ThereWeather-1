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
    padding-top: 100px;

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
        grid-template-areas: "div";
    }
`

const BookMarkContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
    gap: 0.1rem;
    justify-content: space-around;
`
// 게시물 사진
const BookMarkPhoto = styled.div`
    flex-basis: 30rem;
    .postPicture {
        margin: 1rem 2rem;
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
        .postPicture {
            height: 20vh;
        }
    }
    @media screen and (max-width: 375px) {
        .postPicture {
            margin: 0;
        }
    }
`
// 00구,날짜,날씨이모티콘
const BookMarkList = styled.div`
    margin: 1rem;
    line-height: 2.5rem;
    flex-direction: column;
    flex-basis: 15rem;
    justify-content: flex-start;

    .postTitle {
        font-weight: bold;
        font-size: 2.5rem;
    }
    .postDate {
        font-size: 1.5rem;
    }
    .postWeather {
        /* font-size: 1.5rem; */
        width: 5vw;
        height: 5vh;
    }
    img {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1081px) {
    }
    @media screen and (max-width: 375px) {
        margin: 0.1rem 0 0 0.5rem;
        line-height: 1.5rem;
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
`

const BookMarkIcon = styled.div`
    flex-direction: column;
    flex-basis: 10.5rem;
    text-align: end;
    margin: 1rem;
    /* padding: 1rem; */

    @media screen and (max-width: 375px) {
        margin: 0;
        padding: 0 0.3rem 0 0;
    }
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
    @media screen and (max-width: 375px) {
        button {
            font-size: 1rem;
        }
    }
`

const PrevPage = styled.div``

const PageNumber = styled.div`
    li {
        float: left;
        margin: 1.5rem;
    }
    @media screen and (max-width: 375px) {
        li {
            margin: 1rem;
        }
    }
`

const NextPage = styled.div``

export default function BookMark() {
    // 페이지네이션
    const state = useSelector((state) => state.itemReducer)
    const { start, end, current } = state
    const dispatch = useDispatch()
    // const updateCurrentPages = dispatch(updateCurrentPage);
    // const updateStartEndPages = dispatch(updateStartEndPage);
    const updateCurrentPages = (page) => (dispatchs) => {
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
                            <img
                                className="postImg"
                                src={`${process.env.PUBLIC_URL}img/sky.png`}
                                alt="weather"
                            />
                        </div>
                    </BookMarkPhoto>
                    <BookMarkList>
                        <div className="postTitle">00구</div>
                        <div className="postDate">10 / 25</div>
                        <div className="postWeather sky">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/sunny.png`}
                            ></img>
                        </div>
                        <div className="postWeather wind">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/windy.png`}
                            ></img>
                        </div>
                        <div className="postWeather temp">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/hot.png`}
                            ></img>
                        </div>
                    </BookMarkList>
                    <BookMarkIcon>
                        {/* 북마크 버튼 렌더링 필요  */}
                        <FontAwesomeIcon icon={faHeart} size="2x" />
                    </BookMarkIcon>
                </BookMarkContainer>
                <BookMarkContainer>
                    <BookMarkPhoto>
                        <div className="postPicture">
                            <img
                                className="postImg"
                                src={`${process.env.PUBLIC_URL}img/sky.png`}
                                alt="weather"
                            />
                        </div>
                    </BookMarkPhoto>
                    <BookMarkList>
                        <div className="postTitle">00구</div>
                        <div className="postDate">10 / 25</div>
                        <div className="postWeather sky">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/sunny.png`}
                            ></img>
                        </div>
                        <div className="postWeather wind">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/windy.png`}
                            ></img>
                        </div>
                        <div className="postWeather temp">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/hot.png`}
                            ></img>
                        </div>
                    </BookMarkList>
                    <BookMarkIcon>
                        {/* 북마크 버튼 렌더링 필요  */}
                        <FontAwesomeIcon icon={faHeart} size="2x" />
                    </BookMarkIcon>
                </BookMarkContainer>
                <BookMarkContainer>
                    <BookMarkPhoto>
                        <div className="postPicture">
                            <img
                                className="postImg"
                                src={`${process.env.PUBLIC_URL}img/sky.png`}
                                alt="weather"
                            />
                        </div>
                    </BookMarkPhoto>
                    <BookMarkList>
                        <div className="postTitle">00구</div>
                        <div className="postDate">10 / 25</div>
                        <div className="postWeather sky">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/sunny.png`}
                            ></img>
                        </div>
                        <div className="postWeather wind">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/windy.png`}
                            ></img>
                        </div>
                        <div className="postWeather temp">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/hot.png`}
                            ></img>
                        </div>
                    </BookMarkList>
                    <BookMarkIcon>
                        {/* 북마크 버튼 렌더링 필요  */}
                        <FontAwesomeIcon icon={faHeart} size="2x" />
                    </BookMarkIcon>
                </BookMarkContainer>
                <BookMarkContainer>
                    <BookMarkPhoto>
                        <div className="postPicture">
                            <img
                                className="postImg"
                                src={`${process.env.PUBLIC_URL}img/sky.png`}
                                alt="weather"
                            />
                        </div>
                    </BookMarkPhoto>
                    <BookMarkList>
                        <div className="postTitle">00구</div>
                        <div className="postDate">10 / 25</div>
                        <div className="postWeather sky">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/sunny.png`}
                            ></img>
                        </div>
                        <div className="postWeather wind">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/windy.png`}
                            ></img>
                        </div>
                        <div className="postWeather temp">
                            <img
                                src={`${process.env.PUBLIC_URL}img/icons-write/hot.png`}
                            ></img>
                        </div>
                    </BookMarkList>
                    <BookMarkIcon>
                        {/* 북마크 버튼 렌더링 필요  */}
                        <FontAwesomeIcon icon={faHeart} size="2x" />
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
                        <button
                            className="previousPages"
                            onClick={() => {
                                if (current === 1)
                                    return alert("첫번째 페이지입니다")
                                if (current % 10 === 1) {
                                    const s = start - 10
                                    const e = end - 10
                                    updateStartEndPages(s, e)
                                }
                                updateCurrentPages(current - 1)
                            }}
                        >
                            <h4>이전</h4>
                        </button>
                    </li>
                </PrevPage>

                <PageNumber>
                    {target.map((el) => (
                        <li className="pageNum" key={el}>
                            <button
                                className="pageNumbers"
                                onClick={() => {
                                    updateCurrentPages(el)
                                }}
                            >
                                {el}
                            </button>
                        </li>
                    ))}
                </PageNumber>

                <NextPage>
                    <li className="nexPage">
                        <button
                            className="nextPages"
                            onClick={() => {
                                if (current % 10 === 1) {
                                    const s = start - 10
                                    const e = end - 10
                                    updateStartEndPages(s, e)
                                }
                                updateCurrentPages(current + 1)
                            }}
                        >
                            <h4>다음</h4>
                        </button>
                    </li>
                </NextPage>
            </Pagination>
        </Outer>
    )
}
