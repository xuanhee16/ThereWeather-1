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
    border-top: 1px solid #aaa;
  }

  h2.warning--nodata {
    color: #c60239;
    font-size: 3rem;
    margin: 0 1rem;
  }

  @media screen and (max-width: 1081px) {
    .todayCodi {
      margin-top: 2vh;
      font-weight: bold;
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
  @media screen and (max-width: 375px) {
    width: 80%; // 추가
    span {
      font-size: 1.2rem;
    }
  }
`;

const IconDiv = styled.div`
/* display:flex;
justify-content:flex-end; */
`

// 북마크 아이콘
const BookmarkIcon = styled(Bookmark)`
/* float: right;
  & .bookmark {
    cursor: pointer;
    color: #aaa;
  } */
`;
// 카카오 공유 아이콘 
const KakaoBtn = styled.button`
  img {
    margin-left: 1rem;
    padding: 0.25rem;
    margin-bottom: 0.01rem;
    width: 2.7rem;
    height: 2.5rem;
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

  .profileInfo {
    display: flex;
    align-items: center;
    /* margin-left: 1vh; */
  }
  .location {
    font-size: 1.2rem;
  }
  span {
    margin-left: 1vh;
  }
  span.date {
    font-size: 0.8rem;
    color: #707b7c;
  }

  @media screen and (max-width: 1081px) {
    width: 70%;
  }
  @media screen and (max-width: 594px) {
    .location {
      margin-top: 1.2vh;
      font-size: 1.2rem;
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
    height: 30rem;
  }
  @media screen and (max-width: 375px) {
    width: 80%;
    height: 18rem;
  }
`;

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
`;

const Icon = styled.img`
  @media screen and (max-width: 1081px) {
    width: 4rem;
  }
  @media screen and (max-width: 375px) {
    width: 3rem;
  }
`;

// 오늘의 코디 (있을 때, 없을 때)
const TodayCodi = styled.div`
  width: 20%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 3vh;
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
    width: 4rem;
    height: auto;
  }

  @media screen and (max-width: 1081px) {
    width: 50%;
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

// 삭제, 수정 버튼
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 10vh;

  .button {
    width: 7rem;
    height: 3rem;
    border-radius: 1rem;
    background-color: #ffbfcb;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .button2 {
    margin-left: 5rem;
  }
  .button:hover {
    background-color: #ff7f9f;
  }
  .button:before {
    height: 0%;
    width: 2px;
  }
  .button:active {
    border: none;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 1081px) {
    .button2 {
      margin-left: 80px;
    }
  }
  @media screen and (max-width: 375px) {
    width: 40%;
    display: flex;
    justify-content: space-between;
    .button {
      width: 3rem;
      height: 2rem;
      font-size: 1rem;
    }
    .button2 {
      margin-left: 0;
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
`;

let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

export default function PostRead() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { readPostId, userInfo, postInfo } = useSelector(
    (state) => state.itemReducer
  );

  // console.log("현재 접속한 유저",userInfo) //현재접속한 유저
  // console.log("포스트번호 : ",readPostId) //포스트번호
  // console.log(postInfo) //본인것만 보임
  const postIds = Number(readPostId);
  // console.log(postIds)

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
      }).then(() => {
        getCommentList();
        window.location.replace("/readpost");
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
      // console.log("댓글목록 : ", res.data);
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

  const commentLike = () => {
    // 
    axios({
      url: url + "/likecomment",
      method: "post",
      
    })
  }

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
          {/* 카카오 아이콘 자리  */}
          <KakaoBtn onClick={shareKakao}>
            <img src={kakaoIcon}></img>
          </KakaoBtn>
          </IconDiv>
        </Title>

        

        <Profile className="userProfile">
          <div className="profileInfo">
            <ProfileImg src={postData.user_Photo} />
            <span className="nickName">{postData.nickName}</span>
            <span className="date">{formatDate(postData.updatedAt)}</span>
          </div>
          <div>
            <p className="location">{postData.address}</p>
            {/* <p className="location">{postData.xLocation.slice(0, -8)}</p>
            <p className="location">{postData.yLocation.slice(0, -8)}</p> */}
          </div>
        </Profile>
      </PostHeader>
      <PostImg src={postData.post_photo} alt="post picture" />

      <WeatherInfo>
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
      </WeatherInfo>

      {/* 코디가 있을 때, 없을 때 */}
      {
        // 코디 3개 없을때
        (!postData.outer_id || postData.outer_id === "default") &&
        (!postData.top_id || postData.top_id === "default") &&
        (!postData.bottom_id || postData.top_id === "default") ? null : (
          <>
            <h2 className="todayCodi">오늘의 코디</h2>
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

      <Buttons>
        <button className="button button1" value="delete" onClick={deletePost}>
          삭제
        </button>
        {removePost === false ? null : (
          <ModalConfirm
            yesHandler={removeModalYes}
            noHandler={modalNoButtonHandler}
            closeHandler={modalCloseButtonHandler}
          >
            삭제하시겠습니까?
          </ModalConfirm>
        )}
        <button className="button button2" onClick={editPost}>
          수정
        </button>
        {edit === false ? null : (
          <ModalConfirm
            yesHandler={editModalYes}
            noHandler={modalNoButtonHandler}
            closeHandler={modalCloseButtonHandler}
          >
            수정하시겠습니까?
          </ModalConfirm>
        )}
      </Buttons>

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
              commentLike= {commentLike}
            />
          ))}
        </CommentList>
      </CommentSection>
    </Outer>
  );
}
