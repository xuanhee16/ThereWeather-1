import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Bookmark } from "../components/BookMarks";
import ModalConfirm from "../components/ModalConfirm";
import GoBackButton from "../components/GoBackButton";
import { useHistory } from "react-router-dom";
import TopButton from "../components/TopButton";
import Comment from "../components/PostRead-comment";
import { changeUser } from "../actions/index";
import kakaoIcon from "../../src/LoginIcon/kakaoIcon.png";
const { Kakao } = window;

const Outer = styled.div`
  width: 100%;
  background-color: var(--page-bg-color);

  // 오늘의 코디
  .todayCodi {
    margin: 0 auto;
    width: 60%;
    text-align: center;
    color: #2e2e2e;
    padding-top: 2vh;
    font-size: 1.5rem;
  }

  // 잘못된 접근입니다.
  h2.warning--nodata {
    color: #c60239;
    font-size: 3rem;
    margin: 0 1rem;
  }

  @media screen and (max-width: 1081px) {
    .todayCodi {
      margin-top: 2vh;
    }
  }
  @media screen and (max-width: 375px) {
  }
`;
// 제목, 유저프로필사진,닉네임 북마크버튼
const PostHeader = styled.div`
  padding-top: 8vh;
  align-items: center;

  @media screen and (max-width: 1081px) {
    padding-top: 5vh;
  }
`;
// 제목
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 960px;
  text-align: center;
  margin: 0 auto;

  span {
    font-size: 2rem;
  }
 
  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 700px) {
    span {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 375px) {
    width: 80%; // 추가
    span {
      font-size: 1rem;
    }
  }
`;

const IconDiv = styled.div``

// 북마크 아이콘
const BookmarkIcon = styled(Bookmark)`
`;
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

  .profileLeft {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 1vh;
  }
  span.date {
    font-size: 0.8rem;
    color: #707b7c;
  }

  .profileRight {
    border: 1px solid red;
    display: block;
  }
  .location {
    font-size: 1.2rem;
  }


  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 768px) {
    .location {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 594px) {
    .location {
      margin-top: 1.2vh;
    }
  }
  @media screen and (max-width: 375px) {
    width: 80%;
    margin-top: 4vh;
    span {
      font-size: 0.5rem;
    }
    span.date {
      font-size: 0.5rem;
      color: #707b7c;
    }
    .location {
      margin-top: 0;
      font-size: 0.5rem;
    }
  }
`;

const SelectIcon = styled.div`
  width: 100%;
  ul {
    list-style: none;

  }
  li {
    color: #444444;
    text-align: center;
    padding: 0.3rem 0.5rem;
    vertical-align: middle;
  }
  li:hover {
    background-color: #ffbfcb;
  }
  li > img {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
  }

  .selectBtn {
    width: 1.4rem;
    height: 1.6rem;
    vertical-align: middle;
    float: right;

    .selectIcon {
      width: 100%;
      height: 100%;
      filter: opacity(.5) drop-shadow(0 0 0 #c4c4c4);
    }
  }
  .menu {
    width: 100px;
    float: right;
    background: #ffffff;
    border-radius: 5px;
  }
  .menu.active {
    transform: translateY(0);
    border: 1px solid #aaa;
  }
  .menu.inactive {
    transform: translateY(0);
    display: none;
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
`;

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
    height: auto;
  }
  @media screen and (max-width: 375px) {
    width: 80%;
    height: auto;
  }
`;

// 날씨,바람세기,온도 이모티콘 부분
const WeatherInfo = styled.div`
  margin: 3rem auto;
  margin-bottom: 2vh;
  text-align: center;

  p {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  img {
    width: 5rem;
    align-items: center;
    margin: 0 1rem;
  }

  @media screen and (max-width: 1081px) {
    margin-top: 1vh;
    margin-bottom: 1vw;

  }
  @media screen and (max-width: 769px) {
    img {
      width: 3rem;
      margin: 0 0.5rem;
    }
  }
  @media screen and (max-width: 375px) {
    margin-bottom: 3vh;
  }
`;

const Icon = styled.img`

  @media screen and (max-width: 1081px) {
    width: 3rem;
  }
  @media screen and (max-width: 375px) {
    width: 2rem;
  }
`;

// 오늘의 코디 (있을 때, 없을 때)
const TodayCodi = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 3vh;

  .warning {
    display: none;
  }
  & p.warning {
    font-size: 0.9rem;
    width: 6rem;
    height: 6rem;
    text-align: center;
  }

  img {
    width: 5rem;
    height: auto;
    margin: 0 1rem;
    filter: opacity(.5) drop-shadow(0 0 0 #aaa);
  }

  @media screen and (max-width: 769px) {
    img {
      width: 3rem;
      margin: 0 0.5rem;
    }
    
  }
  @media screen and (max-width: 375px) {
    width: 50vw;
  }
`;

// 게시물 내용 scroll
const Post = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  margin-bottom: 5vh;
  padding: 1rem;
  width: 60rem;

  p {
    line-height: 2.5rem;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 375px) {
    width: 85%;
    margin-top: 4vh;
    p {
      line-height: 1.5rem;
      font-size: 1rem;
    }
  }
`;

// 댓글
const CommentSection = styled.div`
  height: auto;
  width: 100%;
  text-align: center;

  input {
    height: 2rem;
    width: 70%;
    margin-right: 1rem;
  }
  button {
    height: 2rem;
    width: 3rem;
  }
  @media screen and (max-width: 1081px) {
    padding-bottom: 6rem;
  }
`;
// 댓글작성
const PostComment = styled.div`
  margin-bottom: 2rem;
  button {
    border: 1px solid black;
  }
`;
// 댓글목록
const CommentList = styled.ul`
  padding: 0 2rem;
  @media screen and (max-width: 769px) {
    padding: 0 1rem;
  }
`;

let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

export default function PostRead() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { readPostId, userInfo, postInfo } = useSelector(
    (state) => state.itemReducer
  );

  console.log("현재 접속한 유저",userInfo) //현재접속한 유저
  console.log("포스트번호 : ",readPostId) //포스트번호
  console.log(postInfo) //본인것만 보임
  const postIds = Number(readPostId);
  console.log(postIds)

  // postData state 변수
  const [postData, setPostData] = useState({
    id: null,
    post_title: "",
    user_id: "",
    createdAt: "",
    updatedAt: "",
    xLocation: "",
    yLocation: "",
    post_photo: "",
    weather: "",
    wind: "",
    temp: "",
    top_id: "",
    bottom_id: "",
    post_content: "",
    address: "",
  });
  const [noIdWarning, setNoIdWarning] = useState("");
  
  // 삭제, 수정, 공유하기 select list
  const [selectList, setSelectList] = useState(false);
  const selectListHandle = () => {
    if(selectList === false) {
      setSelectList(true);
    }else{
      setSelectList(false);
    }
  }

  // 날짜 처리
  const formatDate = (dateString) => {
    // 예시 : 2021. 11. 5. 22:02
    const dateObject = new Date(dateString);
    let dateOnly = dateObject.toLocaleDateString();
    let hourAndMin = dateObject.toLocaleTimeString("en-US", {
      hour12: false,
    });
    hourAndMin = hourAndMin.slice(0, -3);

    return `${dateOnly} ${hourAndMin}`;
  };

  let currentPostId = 0; // post id 저장
  // 글 불러오기
  useEffect(() => {
    //console.log(JSON.parse(localStorage.getItem("ATOKEN")))
    //auth할차례
    if (localStorage.getItem("ATOKEN")) {
      axios({
        url: url + "/users/auth",
        method: "get",
        headers: {
          authorization: `token ${JSON.parse(localStorage.getItem("ATOKEN"))}`,
        },
      }).then((res) => {
        //console.log(res.data.data)
        dispatch(changeUser(res.data.data));

        axios({
          url: url + "/readbookmark",
          method: "post",
          data: {
            user_id: res.data.data.id,
            post_id: postIds,
          },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }).then((res) => {
          //console.log(res.data)
          if (res.data !== "북마크없음") {
            setBookmarked(!bookmarked);
          }
        });
      });
    }
    //////////////////
    function getOnePost(postId) {
      axios
        .get(`${url}/readpost`, {
          headers: { "Content-Type": "application/json" },
          params: { id: postId },
          withCredentials: true,
        })
        .then((res) => {
          // console.log("글 불러오기 : ",res.data)
          return setPostData((prev) => res.data);
        })
        .catch((err) => console.log(err));
    }

    let id;
    // console.log(history.location.state);
    if (history.location.state) {
      id = history.location.state.postId;
    } else {
      id = readPostId;
    }

    if (!id) {
      //console.log("**postread: id가 없습니다**")
      setNoIdWarning((prev) => "잘못된 접근입니다.");
    } else {
      getOnePost(id);
      currentPostId = id;
    }

    // console.log("글 불러오기 id : ", id);
    // console.log("currentPostId : ", currentPostId);
    ////////////////////////
  }, []);

  useEffect(() => {}, []);

  // 북마크 상태
  const [bookmarked, setBookmarked] = useState(false);

  // const [isOpen, setIsOpen] = useState(false);
  // 게시물 수정
  const [edit, setEdit] = useState(false);
  // 게시물 삭제
  const [removePost, setRemovePost] = useState(false);

  // 게시물 수정
  const editPost = () => {
    //console.log("수정버튼동작확인")
    setEdit(true);
  };

  // 게시물 삭제
  const deletePost = (e) => {
    //console.log("삭제버튼동작확인")
    setRemovePost(true);
  };

  //게시물 수정 yes버튼
  const editModalYes = () => {
    axios({
      url: url + "/editpost",
      method: "put",
      data: {
        user_id: userInfo.user_id,
        post_id: postIds,
      },
      withCredentials: true,
    }).then((res) => {
      alert(res.data);
      if (res.data === "게시물의 작성자가 아닙니다.") {
        history.push("/mypage");
      } else {
        history.push("/editpost");
      }
    });
    setEdit(false);
  };

  //게시물 삭제 yes버튼
  const removeModalYes = () => {
    // console.log('삭제완료')
    const token = JSON.parse(localStorage.getItem("ATOKEN"));
    //console.log(token)
    axios({
      url: url + "/deletepost",
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      data: { post_id: postIds },
      withCredentials: true,
    }).then((res) => {
      //console.log(res.data)
      alert(res.data);
      // alert("삭제 완료")
      history.push("/mypage");
    });
    setRemovePost(false);
  };

  const modalNoButtonHandler = () => {
    setRemovePost(false);
    setEdit(false);
  };

  const modalCloseButtonHandler = () => {
    setRemovePost(false);
    setEdit(false);
  };

  const bookmarkHandler = (e) => {
    //console.log("글 읽기 - 북마크 버튼 동작 확인")
    axios({
      url: url + "/bookmark",
      method: "post",
      data: { user_id: userInfo.id, post_id: postIds },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res) => {
      //console.log(res.data)
      setBookmarked((prev) => !prev);
    });
  };

  // 처음 댓글목록 불러오기
  useEffect(() => {
    getCommentList();
  }, []);

  // 댓글작성, 입력부분 초기화
  const [commentMsg, setCommentMsg] = useState(null);
  const [commentList, setCommentList] = useState([]);

  const commentBtnClick = () => {
    if (commentMsg === null) {
      alert("댓글을 입력해주세요.");
    } else {
      axios({
        url: url + "/sendcomment",
        method: "post",
        data: {
          post_id: postData.id,
          comment_user_id: userInfo.user_id,
          comment_content: commentMsg,
        },
        withCredentials: true,
      }).then((res) => {
        console.log("res.data : ",res.data);
        getCommentList();
        // window.location.replace("/readpost");

      });
    }
  };

  // 댓글목록 불러오기
  function getCommentList() {
    axios({
      url: url + "/commentlist",
      headers: { "Content-Type": "application/json" },
      method: "get",
      params: {
        post_id: currentPostId,
      },
      withCredentials: true,
    }).then((res) => {
      setCommentList(res.data);
    });
  }
  const inputHandle = (e) => {
    setCommentMsg(e.target.value);
  };

  // 댓글삭제
  const commentDelete = (commentId) => {
    const token = JSON.parse(localStorage.getItem("ATOKEN"));
    axios({
      url: url + "/deletecomment",
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      data: {
        comment_id: commentId, // 댓글 아이디
      },
      withCredentials: true,
    }).then((res) => {
      window.location.replace("/readpost");
    });
  };

  useEffect(() => {}, []);
  
  //카카오 공유 
  const shareKakao = () => {
      Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: postData.post_title,
          description: "거기 날씨",
          imageUrl: postData.post_photo,
          link:{
            mobileWebUrl: 'https://thereweather.space',
            androidExecutionParams: 'test',
          },
        },
        buttons: [
          {
            title: '거기날씨로 이동',
            link: {
              mobileWebUrl: 'https://thereweather.space',
            },
          },
        ]
      })
  }


  return (
    <Outer>
      {noIdWarning.length !== 0 ? (
        <h2 className="warning--nodata">{noIdWarning}</h2>
      ) : (
        ""
      )}
      <TopButton />
      <GoBackButton />
      <PostHeader className="postHeader">
        <Title className="title">
          <span>{postData.post_title}</span>
        <IconDiv>
          <BookmarkIcon
            bookmarkHandler={bookmarkHandler}
            color={bookmarked ? "#3b5fd9" : "#aaa"}
          />
        </IconDiv>
        </Title>

        <Profile className="userProfile">
          <div className="profileLeft">
            <ProfileImg src={postData.user_Photo} />
            <span className="nickName">{postData.nickName}</span>
            <span className="date">{formatDate(postData.updatedAt)}</span>
          </div>

          <SelectIcon>
            <span className="location">{postData.address}</span>

            <div className="selectBtn">
              <img className="selectIcon" onClick={selectListHandle} src={`${process.env.PUBLIC_URL}img/menu-vertical-100.png`}/>
              <div className={`menu ${selectList? "active" : "inactive"}`}>
                <ul>
                  <li value="delete" onClick={deletePost}>
                    <img src={`${process.env.PUBLIC_URL}img/bin.png`} alt="삭제하기"/>
                    &nbsp;삭제하기
                    </li>
                    <li onClick={editPost}>
                      <img src={`${process.env.PUBLIC_URL}img/edit-120.png`} alt="수정하기"/>                    
                      &nbsp;수정하기
                    </li>
                  <li onClick={shareKakao}>
                    <img className="kakaoImg" src={kakaoIcon}></img>
                    &nbsp;공유하기
                  </li>
                </ul>
              </div>
            </div>
          </SelectIcon>
        </Profile>
      </PostHeader>
      <PostImg src={postData.post_photo} alt="post picture" />

      <WeatherInfo>
        <p>현재 날씨</p>
        <>
          {!postData.weather ? (
            ""
          ) : (
            <Icon
              src={`${process.env.PUBLIC_URL}img/icons-write/${postData.weather}.png`}
              alt="날씨아이콘"
            />
          )}
          {!postData.wind ? (
            ""
          ) : (
            <Icon
              src={`${process.env.PUBLIC_URL}img/icons-write/${postData.wind}.png`}
              alt="바람아이콘"
            />
          )}
          {!postData.temp ? (
            ""
          ) : (
            <Icon
              src={`${process.env.PUBLIC_URL}img/icons-write/${postData.temp}.png`}
              alt="날씨아이콘"
            />
          )}
        </>
      </WeatherInfo>

      {/* 코디가 있을 때, 없을 때 */}
      {
        // 코디 3개 없을때
        (!postData.outer_id || postData.outer_id === "default") &&
        (!postData.top_id || postData.top_id === "default") &&
        (!postData.bottom_id || postData.top_id === "default") ? null : (
          <>
            <p className="todayCodi">오늘의 코디</p>
            <TodayCodi>
              {!postData.outer_id || postData.outer_id === "default" ? (
                <p className="warning">겉옷 데이터가 없습니다</p>
              ) : (
                <Icon
                  src={`${process.env.PUBLIC_URL}img/codi/${postData.outer_id}.png`}
                  alt="겉옷"
                />
              )}
              {!postData.top_id || postData.top_id === "default" ? (
                <p className="warning">상의 데이터가 없습니다</p>
              ) : (
                <Icon
                  src={`${process.env.PUBLIC_URL}img/codi/${postData.top_id}.png`}
                  alt="상의"
                />
              )}
              {!postData.bottom_id || postData.top_id === "default" ? (
                <p className="warning">하의 데이터가 없습니다</p>
              ) : (
                <Icon
                  src={`${process.env.PUBLIC_URL}img/codi/${postData.bottom_id}.png`}
                  alt="하의"
                />
              )}
            </TodayCodi>
          </>
        )
      }

      <Post>
        <p>{postData.post_content}</p>
      </Post>

      {removePost === false ? null : (
        <ModalConfirm
          yesHandler={removeModalYes}
          noHandler={modalNoButtonHandler}
          closeHandler={modalCloseButtonHandler}
        >
          삭제하시겠습니까?
        </ModalConfirm>
      )}
      {edit === false ? null : (
        <ModalConfirm
          yesHandler={editModalYes}
          noHandler={modalNoButtonHandler}
          closeHandler={modalCloseButtonHandler}
        >
          수정하시겠습니까?
        </ModalConfirm>
      )}

      <CommentSection>
        {/* 댓글작성 */}
        <PostComment>
          <input
            type="text"
            placeholder="댓글을 작성해주세요."
            onChange={inputHandle}
          />
          <button onClick={commentBtnClick}>작성</button>
        </PostComment>
        {/* 댓글목록 */}
        <CommentList>
          {commentList.map((content) => (
            <Comment
              key={content.id}
              content={content}
              commentDelete={commentDelete}
              userInfo={userInfo}
            />
          ))}
        </CommentList>
      </CommentSection>
    </Outer>
  );
}
