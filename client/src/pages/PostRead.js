import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Bookmark } from "../components/Heart";
import ModalConfirm from "../components/ModalConfirm";
import GoBackButton from  "../components/GoBackButton";
import { useHistory } from "react-router-dom";
import { changeIsLogin, userPosts } from "../actions/index"


const Outer = styled.div`
  width: 100vw;
  background-color: var(--page-bg-color);

  // 오늘의 코디
  .todayCodi{
    margin: 0 auto;
    width: 60%;
    text-align: center;
    // font-size: 25px;
    // font-weight: bold;
    color: #2E2E2E;
    padding-top: 2vh;
    border-top: 1px solid #aaa;
  }
  @media screen and (max-width: 1081px){
    .todayCodi{
      margin-top: 2vh;
      // font-size: 2rem;
      font-weight: bold;
    }
  }
  @media screen and (max-width: 375px) {
    .todayCodi{
      // font-size: 1.5rem;
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
  display: flex;
  justify-content: space-between;
  width: 80vw;
  text-align: center;
  margin: 0 auto;

  // 제목글자수 제한 필요?
  span{
    font-size: 2rem;
  }

  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 375px) {
    span{
      font-size: 1.2rem;
    }
  }
`

// 북마크 아이콘
const BookmarkIcon = styled(Bookmark)`
  float: right;

  & .heart{
    cursor: pointer;
    color: #aaa;
  }
`

// 프로필
const Profile = styled.div`
  width: 60rem;
  margin: 0 auto;
  margin-top: 2vh;
  padding-bottom: 3vh;
  border-bottom: 1px solid #aaa;
  align-items: center;
  display: flex; 
  justify-content: space-between;
  flex-flow: wrap;
  
  .profileInfo{
    display: flex; 
    align-items: center;
    /* margin-left: 1vh; */
  }
  .location{
    font-size: 1.2rem;
  }
  span{
    margin-left: 1vh;
  }

  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 594px) {
    .location{
      margin-top: 1.2vh;
      font-size: 1.2rem;
    }
  }
  @media screen and (max-width: 375px) {
    width: 80%;
    margin-top: 4vh;
    span{
      font-size: 0.5rem;
    }
    .location{
      font-size: 0.5rem;
    }
  }
`
// 프로필 이미지
const ProfileImg = styled.img`
  border: 1px solid #aaa;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  @media screen and (max-width: 375px) {
    width: 2rem;
    height: 2rem;
  }
`

// 게시물 사진 (있을 때, 없을때)
const PostImg = styled.img`
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
  @media screen and (max-width: 375px) {
    width: 80%;
    height: 18rem;
  }
`

// 날씨,바람세기,온도 이모티콘 부분
const WeatherInfo = styled.div`
  width: 330px;
  margin-top: 4vh;
  display: flex;
  margin: 0 auto;
  margin-bottom: 2vh;
  justify-content: space-between;

  @media screen and (max-width: 1081px) {
    margin-top: 1vh;
    margin-bottom: 1vw;
    justify-content: space-around;
  }
  @media screen and (max-width: 375px) {
    width: 50%;
    margin-bottom: 3vh;
  }
`

const Icon = styled.img`
  @media screen and (max-width: 1081px) {
    width: 4rem;
  }
  @media screen and (max-width: 375px) {
    width: 3rem;
  }
`

// 오늘의 코디 (있을 때, 없을 때)
const TodayCodi = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items:center;
  margin: auto;
  margin-top: 3vh;
  margin-bottom: 3vh;
  // font-size: 8rem;

  & p {
    font-size: .9rem;
    width: 6rem;
    height: 6rem;
    text-align: center;
  }

  @media screen and (max-width: 1081px) {
    width: 50%;
    // font-size: 5rem;
  }
  @media screen and (max-width: 375px) {
    width: 50vw;
    // font-size: 70px;
  }
`

// 게시물 내용 scroll
const Post = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  margin-bottom: 5vh;
  padding: 1rem;
  width: 60rem;
  
  p{
    line-height: 2.5rem;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 375px) {
    width: 85%;
    margin-top: 4vh;
    p{
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }
`

// 삭제, 수정 버튼
const Buttons = styled.div`
  width: 15rem;
  margin: 0 auto;
  padding-bottom: 10vh;

  .button{
    width: 5rem;
    height: 3rem;
    border-radius: 5px;
    background-color: var(--button-bg-normal);
    font-size: 1.2rem;
  }
  .button2{
    margin-left: 5rem;
  }
  .button:before{
    height: 0%;
    width: 2px;
  }
  .button:active{
    border: none;
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
  }

  @media screen and (max-width: 1081px) {
    .button2{
      margin-left: 80px;
    }
  }
  @media screen and (max-width: 375px) {
    width: 40%;
    display: flex;
    justify-content: space-between;
    .button{
      width: 3rem;
      height: 2rem;
      font-size: 1rem;
    }
    .button2{
      margin-left: 0;
    }
  }
`
// 스크롤 top 버튼 (필요한 페이지 추가적으로 나오면 컴포넌트로 만들기)
const TopButton = styled.div`
  /* width: 100%; */
  height: 200px;
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  right: 0;
  bottom: 0;
  transition: all 0.3s;

  img{
    width: 6rem;
    height: 6rem;
    margin-right: 2vh;
    opacity: 0.7;
  }

  @media screen and (max-width: 1081px) {
    height: 200px;
    img{
      width: 6rem;
      height: 6rem;
      margin-right: 3vh;
    }
  }
  @media screen and (max-width: 375px) {
    height: 130px;
    img{
      width: 3rem;
      height: 3rem;
      margin-right: 2vh;
    }
  }
`

let url = process.env.REACT_APP_LOCAL_URL
if (!url) url = "https://thereweather.space"

export default function PostRead(){
  const history = useHistory()
  // post id 가져오기
  const { readPostId } = useSelector(state => state.itemReducer);
  // postData state 변수
  const [postData, setPostData] = useState({
    id: null,
    post_title: '',
    user_id: '',
    createdAt: '',
    updatedAt: '',
    xLocation: '',
    yLocation: '',
    post_photo: '',
    weather: '',
    wind: '',
    temp: '',
    top_id: '',
    bottom_id: '',
    post_content: ''
  });

  // 날짜 처리
  const formatDate = (dateString) => {
    // 예시 : 2021. 11. 5. 22:02
    const dateObject = new Date(dateString);
    let dateOnly = dateObject.toLocaleDateString();
    let hourAndMin = dateObject.toLocaleTimeString('en-US', { hour12: false });
    hourAndMin = hourAndMin.slice(0, -3);

    return `${dateOnly} ${hourAndMin}`
  }

  // 글 불러오기
  useEffect(() => {
    function getOnePost(postId) {
      axios.get(`${url}/readpost`, {
        headers: { "Content-Type": "application/json" },
        params: { id: postId },
        withCredentials: true
      })
      .then (res => {
        console.log(res.data);
        setPostData(prev => res.data);
      })
      .catch (err => console.log(err));
    };

    if (!readPostId) {
      console.log('**postread: id가 없습니다**');
    } else {
      getOnePost(readPostId);
    }
  }, [readPostId])

  // 북마크 상태
  const [bookmarked, setBookmarked] = useState(false);

  // const [isOpen, setIsOpen] = useState(false);
  // 게시물 수정
  const [edit, setEdit] = useState(false)
  // 게시물 삭제
  const [removePost, setRemovePost] = useState(false)

  // 게시물 수정
  const editPost = () => {
    console.log('수정버튼동작확인');
    setEdit(true);
  }

  // 게시물 삭제
  const deletePost = (e) => {
    console.log('삭제버튼동작확인');
    setRemovePost(true);
  }

  const editModalYes = () => {
    setEdit(false);
    history.push("/editpost");
  }

  //삭제버튼 
  const removeModalYes = () => {
    // console.log('삭제완료')
    axios({
      url:  url + "/deletepost",
      method: "delete",
      withCredentials: true
    })
    .then(() => {
      alert("삭제 완료")
      history.push("/mypage")
    })
    setRemovePost(false)
  }

  const modalNoButtonHandler = () => {
    setRemovePost(false)
    setEdit(false)
  }

  const modalCloseButtonHandler = () => {
    setRemovePost(false)
    setEdit(false)
  }

  const bookmarkHandler = (e) => {
    console.log('글 읽기 - 북마크 버튼 동작 확인');
    setBookmarked(prev => !prev);
    // console.log(e.currentTarget);
  }

  // top button
  const [ScrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);  // 버튼 상태

  // console.log(window.pageYOffset)
  // console.log(btnStatus)

  const handleFollow = () => {
    setScrollY(window.scrollY)
    if(ScrollY > 200){  // 200 이상이면 버튼이 보임
      setBtnStatus(true)
    }else{  // 200 이하일때 버튼이 사라짐
      setBtnStatus(false)
    }
  }

  // 클릭시 위로 올라감
  const scrollToTop = () => {
    // e.preventDefault() // 새로고침 방지
    window.scrollTo({top: 0, behavior: 'smooth'}) // 위로 올라감
    setScrollY(0);  // 올라가면 다시 0으로 초기화
    setBtnStatus(false); // 버튼 다시 사라짐
  }

  useEffect(() => {
    window.addEventListener('scroll', handleFollow)
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  return (
    <Outer>
      <TopButton>
        {
          btnStatus?
          <img 
            src={`${process.env.PUBLIC_URL}img/scroll-up-2.png`} alt="top"
            onClick={scrollToTop}
          /> : null
        }
      </TopButton>
      <GoBackButton/>
      <PostHeader>
        <Title>
          {/* <span>{'오늘 날씨 맑음☀️'}</span> */}
          <span>{postData.post_title}</span>
          <BookmarkIcon
            bookmarkHandler={bookmarkHandler}
            color={bookmarked ? '#ED4956' : '#aaa'}
          />
        </Title>

        <Profile>
          <div className="profileInfo">
            <ProfileImg src={"img/user-img.png"}/>
            <span className="nickName">{'김코딩'}</span>
            <span className="date">
              {formatDate(postData.updatedAt)}
            </span>
          </div>
          {/* <p className="location">{'서울시 종로구 가회동'}</p> */}
          <div>
            <p className="location">{postData.xLocation.slice(0, -8)}</p>
            <p className="location">{postData.yLocation.slice(0, -8)}</p>
          </div>
        </Profile>
      </PostHeader>
      {/* <PostImg src={`${process.env.PUBLIC_URL}img/sky.png`} alt="weather"/> */}
      <PostImg src={postData.post_photo} alt="post picture" />

      <WeatherInfo>
          {/* <WeatherIcon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.weather}.png`} alt="날씨아이콘"/>
          <WeatherIcon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.wind}.png`} alt="날씨아이콘"/>
          <WeatherIcon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.temp}.png`} alt="날씨아이콘"/> */}
          {
            !postData.weather?
              ''
            :
              <Icon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.weather}.png`} alt="날씨아이콘"/>
          }
          {
            !postData.wind?
              ''
            :
              <Icon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.wind}.png`} alt="바람아이콘"/>
          }
          {
            !postData.temp?
              ''
            :
              <Icon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.temp}.png`} alt="날씨아이콘"/>
          }
      </WeatherInfo>

      {/* 코디가 있을 때, 없을 때 */}
      <h2 className="todayCodi">오늘의 코디</h2>
      <TodayCodi>
          {/* <FontAwesomeIcon icon={faTshirt} color="purple"/>
          <FontAwesomeIcon icon={faTshirt} color="pink"/> */}
          {
            !postData.top_id || postData.top_id === 'default' ?
              <p>상의 데이터가 없습니다</p>
            :
              <Icon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.top_id}.png`} alt="상의" />
          }
          {
            !postData.bottom_id || postData.top_id === 'default' ?
              <p>하의 데이터가 없습니다</p>
            :
              <Icon src={`${process.env.PUBLIC_URL}img/icons-write/${postData.bottom_id}.png`} alt="하의" />
          }
      </TodayCodi>

      <Post>
        {/* <p>
        곧 심장은 얼음과 예수는 열락의 가는 눈에 영원히 얼음에 것이다. 주는 일월과 대한 안고, 생의 스며들어 장식하는 위하여서. 이상의 온갖 이것은 가슴이 우리의 넣는 바이며, 하는 듣는다. 얼마나 수 만물은 작고 역사를 방지하는 것이다. 앞이 인도하겠다는 그들에게 때까지 아름다우냐? 자신과 위하여 많이 유소년에게서 봄바람이다. 능히 몸이 우리의 곳으로 운다.
        </p> */}
        <p>
          {postData.post_content}
        </p>
      </Post>

      <Buttons>
        <button className="button button1" value="delete" onClick={deletePost}>삭제</button>
        {removePost === false ? null : (
          <ModalConfirm
            yesHandler={removeModalYes}
            noHandler={modalNoButtonHandler}
            closeHandler={modalCloseButtonHandler}
          >삭제하시겠습니까?</ModalConfirm>
          )}
        <button className="button button2" onClick={editPost}>수정</button>
        {edit === false ? null : (
          <ModalConfirm
            yesHandler={editModalYes}
            noHandler={modalNoButtonHandler}
            closeHandler={modalCloseButtonHandler}
          >수정하시겠습니까?</ModalConfirm>
        )}
      </Buttons>

      {/* <TopButton>
          <img src={`${process.env.PUBLIC_URL}img/scroll-up-2.png`} alt="top"></img>
      </TopButton> */}

    </Outer>
  )
}

// TODO 응답에서 사용할 값에 * 표시
// * bottom_id: "pants"
// * createdAt: "2021-11-08T02:57:35.000Z"
// id: 4
// * post_content: "빨간색"
// * post_photo: "http://localhost:80/img/imgfile1636340242444.png"
// * post_title: "add"
// * temp: "cold"
// * top_id: "shirts"
// * updatedAt: "2021-11-08T02:57:35.000Z"
// * user_id: "dummydummy"
// * weather: "cold"
// * wind: null
// * xLocation: "36.619121200000000"
// * yLocation: "127.433451700000000"
// 닉네임이... 없어...