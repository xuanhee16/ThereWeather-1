import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudRain,
  faPooStorm,
  faSnowflake,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  changeIsLogin,
  changeSearchword,
  changeWeatherFilter,
} from "../actions/index";
import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";

const HeaderOuter = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  border-bottom: 0.5px solid #dbdbdb;
  justify-content: space-between;

  .mobileMenu.active {
    
  }
  .mobileMenu.inactive {
    display: none;
  }
  
  @media screen and (max-width: 1081px) {
    height: auto;
    padding: 1rem  0;
    justify-content: space-between;
    flex-direction: column;
  }
`;

// 검색창
const Wing = styled.div`
  display: none;
  @media screen and (min-width: 1081px) {
    display: flex;
    flex-growth: 1;
    align-items: center;
    justify-content: center;
    width: 20vw;
  }
`;


// 로고
const TitleAndLogo = styled.div`
  /* display: ${(props) => (props.isMobileLogo ? "flex" : "none")}; //map일때 헤더 */
  display: flex;
  align-items: center;
  color: #231f20;
  
  p {
    font-weight: bold;
    font-size: 1.4rem;
  }
  img {
    width: 4rem;
    margin-right: 0.5rem;
  }

  @media screen and (max-width: 1081px) {
    /* width: 100%; */   
  }

  @media screen and (max-width: 500px) {
    img {
      width: 3rem;
      margin-right: 0.3rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;

// 메뉴
const Center = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  justify-content: space-around;
  flex-direction: row;
  width: 55%;

  @media screen and (max-width: 1081px) {
    display: none;
  }
`;

// 메뉴버튼
const MenuButtons = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;

  button {
    display: block;
    position: relative;
    cursor: pointer;
    transition: 800ms ease all;
    
  }
  button:hover {
    color: #FE7E9D;
  }

  button:before,button:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: pink;
    transition:400ms ease all;
  }
  /* 버튼 선 */
  button:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }
  button:hover:before,button:hover:after{
    width:100%;
    transition:800ms ease all;
  }

  p {
    font-size: 1.1rem;
    height: 2rem;
    line-height: 2.2rem;
    font-family: 'Gowun Dodum', sans-serif;
  }
`

const InputAndSubmit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: auto 1rem;
  }
  @media screen and (max-width: 1081px) {
    div {
      margin: 0;
    }
  }
`;
// 주소검색창 부분
const StyledPostCode = styled(DaumPostcode)`
  position: absolute;
  top: 50px;
  border: 1px solid #e0e0e0;
  @media screen and (max-width: 1081px) {
    top: 32px;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  background-color: var(--page-bg-color);
  border: 0.5px solid #dbdbdb;
  border-radius: 3px;

  @media screen and (min-width: 1081px) {
    width: 300px;
  }
  @media screen and (max-width: 375px) {
    width: 220px;
    height: 30px;
    font-size: 1rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg:hover {
    color: red;
  }

  @media screen and (max-width: 375px) {
    button {
      width: 35px;
      height: 35px;
      font-size: 20px;
    }
  }
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.bgGrey || props.isText ? "white" : "white"};
  color: ${(props) => (props.bgGrey || props.isText ? "#ff6384" : "grey")};
  font-size: ${(props) => (props.isText ? "1.6rem" : "1.6rem")};
  padding: ${(props) => (props.bgGrey ? ".6rem" : ".4rem")};
  margin: 0.5rem;
  border-radius: 10%;
  right: 0;
`;

// 오른쪽 로그인, 회원가입 버튼 
const Button3 = styled.button`
  font-size: ${(props) => (props.isText ? "1rem" : "1rem")};
  font-family: "IBM Plex Sans KR", sans-serif;
  padding: ${(props) => (props.bgGrey ? ".6rem" : ".4rem")};
  margin: 0.5rem;
  border-radius: 10%;
  color: ${(props) => (props.bgGrey || props.isText ? "#ff6384" : "grey")};
  background-color: ${(props) =>
    props.bgGrey || props.isText ? "white" : "white"};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: pink;
    box-shadow: 0px 15px 20px #f7cac9;
    color: #fff;
    transform: translateY(-4px);
  }

`;

// 오른쪽 로그인, 회원가입 버튼 div
const Buttons3 = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1081px) {
    display: none;
  }
`;

const Cancel = styled.button`
  // height: 3.5rem;
  // width: 100%;
  // padding-right: 2.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  /* padding: 0.3rem; */
`;

const Buttons2 = styled.div`
  background-color: ${(props) => (props.bgGrey ? "#E0E0E0" : "white")};
  color: ${(props) => (props.bgGrey || props.isText ? "black" : "grey")};
  font-size: ${(props) => (props.isText ? "1.2rem" : "1.6rem")};
  padding: ${(props) => (props.isText ? ".6rem" : ".4rem")};
  margin: 0.5rem;
  border-radius: 10%;
  @media screen and (max-width: 1081px) {
    padding: ${(props) => (props.isText ? ".6rem" : "0 0.5rem")};
  }
  @media screen and (max-width: 375px) {
    font-size: ${(props) => (props.isText ? "1.2rem" : "1.2rem")};
    padding: ${(props) => (props.isText ? ".6rem" : ".2rem")};
    height: 2rem;
  }
`;

// 모바일 화면 상단 메뉴아이콘
const MobileMenuBar = styled.div`
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  img {
    width: 100%;
  }
  @media screen and (max-width: 1081px) {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1.5rem;
  }
`

const MobileMenuSection = styled.div`
  width: 100%;
  display: none;
  
  ul {
    list-style: none;
    text-align: center;
    margin-top: 1rem;
  }
  li {
    padding: 0.5rem 0;
  }

  @media screen and (max-width: 1081px) {
    display: block;
    font-weight: bold;
    font-size: 1rem;

    li {
      transition: all 0.3s ease 0s;

      &:hover {
        background-color: pink;
        color: #f0f4f5;
      }

    }
    
  }

`


let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

export default function Header({ isInput, isMobileLogo, isText }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin, mapPage } = useSelector((state) => state.itemReducer);
  const [searchEvent, setSearchEvent] = useState("");
  //검색창에 사용할 포커스변수-hoon
  const [onFocus, setOnFocus] = useState(false);
  // const [postOnFocus, setOnFocus] = useState(false)

  // isInput : Map 페이지 사용시 true
  // isMobileLogo : Map 페이지 사용시 false
  function handleComplete(e) {
    setSearchEvent(e.roadAddress);
    setOnFocus(false);
  }
  const [weatherFilter, setweatherFilter] = useState("");
  useEffect(() => {
    setweatherFilter(weatherFilter);
    dispatch(changeWeatherFilter(weatherFilter));
  }, [weatherFilter]);

  const logoutBtnHandler = (e) => {
    const token = JSON.parse(localStorage.getItem("ATOKEN"));
    axios
      .post(
        url + "/signout",
        { data: null },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.clear();
        dispatch(changeIsLogin(false));
        history.push("/");
      });
      setMenuBarClick(false)
  };

  const [menuBarClick, setMenuBarClick] = useState(false)
  const menuBarHandler = () => {
    if(menuBarClick === false){
      setMenuBarClick(true)
    }else{
      setMenuBarClick(false)
    }
  }

  return (
    <HeaderOuter className="header">
      {/* <MenuBar></MenuBar> */}
      
      <TitleAndLogo className="titleAndLogo" isMobileLogo={isMobileLogo}>
        <img onClick={() => history.push("/")} src="img/img6.png" alt="logo" />
        <p onClick={() => history.push("/")}>There Weather</p>
      </TitleAndLogo>

      {/* 검색창 */}
      {/* {isInput ? (
        <Center className="headerCenter">
          <InputAndSubmit className="inputAndSubmit">
            <Input
              onChange={(e) => setSearchEvent(e.target.value)}
              type="text"
              placeholder="위치 검색"
              value={searchEvent}
              // ref={inputRef}
              // onClick={onRest}
              onFocus={(e) => setOnFocus(true)}
            />
            <Buttons2 bgGrey>
              {onFocus ? (
                <Cancel onClick={() => setOnFocus(false)}>Cancel</Cancel>
              ) : (
                <FontAwesomeIcon
                  onClick={() => {
                    dispatch(changeSearchword(searchEvent));
                    history.push("/map");
                  }}
                  icon={faSearch}
                />
              )}
            </Buttons2>
          </InputAndSubmit>
          {onFocus ? (
            <StyledPostCode
              className="daumPostCodeContainer"
              onComplete={handleComplete}
            />
          ) : (
            <></>
          )}
          {mapPage.mapPage ? (
            // 지우기 금지
            // <Buttons className="headerButtons">
            //   <Button
            //     onClick={() => {
            //       if (weatherFilter === "sunny") {
            //         return setweatherFilter("");
            //       }
            //       return setweatherFilter("sunny");
            //     }}
            //     isText={weatherFilter === "sunny" ? true : false}
            //   >
            //     <FontAwesomeIcon icon={faSun} />
            //   </Button>
            //   <Button
            //     onClick={() => {
            //       if (weatherFilter === "cloudy") {
            //         return setweatherFilter("");
            //       }
            //       return setweatherFilter("cloudy");
            //     }}
            //     isText={weatherFilter === "cloudy" ? true : false}
            //   >
            //     <FontAwesomeIcon icon={faCloud} />
            //   </Button>
            //   <Button
            //     onClick={() => {
            //       if (weatherFilter === "rainy") {
            //         return setweatherFilter("");
            //       }
            //       return setweatherFilter("rainy");
            //     }}
            //     isText={weatherFilter === "rainy" ? true : false}
            //   >
            //     <FontAwesomeIcon icon={faCloudRain} />
            //   </Button>
            //   <Button
            //     onClick={() => {
            //       if (weatherFilter === "snowy") {
            //         return setweatherFilter("");
            //       }
            //       return setweatherFilter("snowy");
            //     }}
            //     isText={weatherFilter === "snowy" ? true : false}
            //   >
            //     <FontAwesomeIcon icon={faSnowflake} />
            //   </Button>
            // </Buttons>
            <div></div>
          ) : (
            <>
              <div></div>
            </>
          )}
        </Center>
      ) : (
        <Center className="headerCenter" />
      )} */}
      {/* 검색창 끝 */}

      <Center>
        <MenuButtons>
          <button onClick={() => history.push("/homeorlogin")}>
            <p>Home</p>
          </button>
          <button onClick={() => history.push("/bookmarkorlogin")}>
            <p>Bookmark</p>
          </button>   
          <button onClick={() => history.push("/map")}>
            <p>Map</p>
          </button>
          <button onClick={() => history.push("/writeorlogin")}>   
            <p>Write</p>
          </button>
          <button>
            <p onClick={() => history.push("/moreoruserinfo")}>Settings</p>
          </button>

        </MenuButtons>
      </Center>

      {isLogin ? (
        <Buttons3 className="loginAndSingupButtons">
          {/* className="login" isText */}
          <Button3 className="login" onClick={logoutBtnHandler} isText>
            logOut
          </Button3>
          <Button3
            onClick={() => history.push("/mypage")}
            className="signup"
            isText
          >
            mypage
          </Button3>
        </Buttons3>
      ) : (
        <Buttons3 className="loginAndSingupButtons">
          <Button3
            onClick={() => history.push("/login")}
            className="login"
            isText
          >
            logIn
          </Button3>
          <Button3
            onClick={() => history.push("/signup")}
            className="signup"
            isText
          >
            signUp
          </Button3>
        </Buttons3>
      )}

      <MobileMenuBar onClick={menuBarHandler}>
        <img src={`${process.env.PUBLIC_URL}img/menu-bar.png`}/>
      </MobileMenuBar>
      
      <MobileMenuSection className={`mobileMenu ${menuBarClick? "active" : "inactive"}`}>
        {isLogin? 
          <ul>
            <li onClick={logoutBtnHandler}>
              <p>로그아웃</p>
            </li>
            <li onClick={() => {
              history.push("/mypage")
              setMenuBarClick(false)
            }}>
              <p>마이페이지</p>
            </li>
          </ul> 
          :
          <ul>
            <li onClick={() => {
              history.push("/login")
              setMenuBarClick(false)
            }}>
              <p>로그인</p>
            </li>
            <li onClick={() => {
              history.push("/signup")
              setMenuBarClick(false)
            }}
              >
              <p>회원가입</p>
            </li>
          </ul>
        }
      </MobileMenuSection>

    </HeaderOuter>
  );
}