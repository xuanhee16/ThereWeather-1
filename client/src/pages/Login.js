import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { changeIsLogin, changeMapPage } from "../actions/index";
import { Toggle } from "../components/Toggle";
import DaumPostcode from "react-daum-postcode";
import kakaoIcon from "../../src/LoginIcon/kakaoIcon.png";
import googleIcon from "../../src/LoginIcon/googleIcon.png";
const { Kakao } = window;

const LoginOuter = styled.section`
  position: relative;
  width: 100vw;
  min-height: calc(var(--mobile-page-height) - 70px);
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 2rem auto;
  }
  @media screen and (min-width: 1081px) {
    height: calc(100vh - 125px);
  }
`;

const LoginStyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FindBtn = styled.button`
  font-size: 1rem;
  margin: 1rem 14.5rem;
  padding: 1rem;
`;

const LoginInputAndTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  h3 {
    font-size: 1.4rem;
    margin: 1rem;
    font-weight: bold;
  }
`;

const LoginInputText = styled.input`
  min-width: 150px;
  width: 30vw;
  font-size: 1.2rem;
  padding: 0.5rem;
`;

const LoginValidationListBox = styled.ul`
  list-style: none;
  padding: 0 1.5rem;
  font-size: 1rem;
  li {
    height: 1.2rem;
    padding: 0 1.5rem;
    color: var(--font-validation-negative);
  }
`;

const LoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  img {
    margin: 1rem;
    width: 3.5rem;
    height: 3.5rem;
  }
`;

const LoginButton = styled.button`
  width: 50vw;
  min-width: 100px;
  max-width: 300px;
  margin: 1rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  background-color: pink;
  border-radius: 1rem;
  &:hover {
    background-color: #ff7f9f;
    color: white;
  }
  > span {
    margin: 0.25rem;
  }
`;
/////////////////socialSignup스타일/////////////////////////////////

const Outer = styled.section`
  position: relative;
  width: 100vw;
  // height: var(--mobile-page-height);
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;

  h2 {
    margin-top: 3rem;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 1081px) {
    // height: calc(100vh - 125px);
  }
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputAndTitle = styled.div`
  // display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 1rem;

  h3 {
    font-size: 1.4rem;
    margin: 1rem;
    font-weight: bold;
  }
`;
const InputAndTitle2 = styled.div`
  // border: 1px solid blue;

  display: flex;
  flex-direction: row;
  // margin-top: -7rem;
  // padding-top: -5rem;

  align-items: center;
  h3,
  div {
    font-size: 1.4rem;
    margin: 1rem;
    font-weight: bold;
    margin-right: -1rem;
  }
  h3 {
    margin-left: 2rem;
  }
`;

const InputText = styled.input`
  min-width: 150px;
  width: 30vw;
  font-size: 1.2rem;
  padding: 0.5rem;
`;

const ValidationListBox = styled.ul`
  list-style: none;
  padding: 0 1.5rem;
  font-size: 1rem;

  li {
    height: 1.2rem;
    padding: 0 1.5rem;
    color: var(--font-validation-negative);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
`;

const Button = styled.button`
  width: 50vw;
  min-width: 100px;
  max-width: 300px;
  margin: 1rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #ea4335;
  border-radius: 1rem;

  > span {
    margin: 0.25rem;
  }
`;
const Buttons2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
`;

const Button3 = styled.button`
  width: 50vw;
  min-width: 100px;
  max-width: 300px;
  margin: 1rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #2f6ecb;
  border-radius: 1rem;

  > span {
    margin: 0.25rem;
  }
`;

const Button2 = styled.input`
  width: 50vw;
  min-width: 100px;
  max-width: 300px;
  margin: 1rem;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.google ? "#EA4335" : "#2f6ecb")};
  border-radius: 1rem;

  > span {
    margin: 0.25rem;
  }
`;
////////////////////////
const PhotoUploadSection = styled.form`
  // border: 2px solid yellow;
  // margin: auto 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PhotoBox = styled.div`
  min-width: 300px;
  width: 30vh;
  height: 30vh;
  background-color: #ececec;
  font-size: 30px;
  color: palevioletred;
  border: 1px solid #b5b5b5;
  /* width: 300px;
height: 150px; */
  object-fit: cover;
`;
const PhotoBox2 = styled.img`
  min-width: 300px;
  width: 30vh;
  height: 30vh;
`;

////////////////////////////////////////////////////
// const url = "https://thereweather.space"
let url = process.env.REACT_APP_LOCAL_URL;
let clientUrl = process.env.REACT_APP_CLIENTURL;
if (!url) {
  url = "https://thereweather.space/api";
  clientUrl = "https://thereweather.space";
}

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(url)

  // input 상태 관리, 유효성 검사
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [idInputMessage, setIdInputMessage] = useState("아이디를 입력하세요..");
  const [pwInputMessage, setPwInputMessage] =
    useState("비밀번호를 입력하세요.");
  const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1079927639813-87e5g0991msheh50mt77eclt2vij4kks.apps.googleusercontent.com&response_type=token&redirect_uri=${clientUrl}/login&scope=https://www.googleapis.com/auth/userinfo.email`;
  const { isLogin } = useSelector((state) => state.itemReducer);

  const [socialLogined, setSocialLogined] = useState(false);
  const [inputSignUpData, setInputSignUpData] = useState({
    idInput: "",
    pwInput: "",
    nickNameInput: "",
  });

  useEffect(() => {
    // console.log("나는 login.js")
    dispatch(changeMapPage(false));
    const urlinfo = new URL(window.location.href);
    const hash = urlinfo.hash;
    if (hash) {
      const accessToken = hash.split("=")[1].split("&")[0];
      axios({
        url:
          "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
          accessToken,
        method: "get",
        headers: {
          authorization: `token ${accessToken}`,
          accept: "application/json",
        },
      }).then((res) => {
        console.log(res.data);
        console.log(res.data.email);
        console.log(res.data.verified_email);
        //구글에 정상 인증완료시-hoon
        if (res.data.verified_email) {
          //구글측의 정상인증 회원이지만, 우리사이트 간편가입 되어있는지 확인 요청 -hoon
          axios({
            url: url + `/users/socialcheck?user_id=${res.data.email}`,
            method: "get",
            headers: {
              accept: "application/json",
            },
          }).then((res2) => {
            // 소셜인증 되었으나 회원등록은 안된경우-hoon
            console.log(res2.data);
            if (!res2.data) {
              alert("소셜 간편 가입 필요");
              setSocialLogined(true);
              setInputSignUpData({
                ...inputSignUpData,
                idInput: res.data.email,
              });
              setInputVaildMessage({
                ...inputVaildMessage,
                idInput: "",
              });
              //구글에서 준 프로필이미지를 우리사이트의 이미지로 기본값으로 사용
              //사용자가 새로 업로드도 가능함
              setUploadedImg({
                fileName: "default-user=s96-c",
                filePath: `https://lh3.googleusercontent.com/a/default-user=s96-c`,
              });
            }
            //소셜인증 되었으며, 회원등록 된경우-hoon
            else {
              // dispatch(changeIsLogin(res.data.verified_email))
              alert("소셜 간편 가입 되어있는 회원");
              console.log(res.data.email);
              // setInputSignUpData({
              //     ...inputSignUpData,
              //     idInput: res.data.email,
              // })
              console.log(inputSignUpData.idInput);
              setInputVaildMessage({
                ...inputVaildMessage,
                idInput: "",
              });
              console.log(res.data.email);
              socialAutoLogin(res.data.email);
            }
          });
        }
        //구글 인증실패시 로그인 불가-hoon
        else {
          alert("구글에 인증된 사용자가 아님");
        }
      });
    }
  }, []);
  //console.log(isLogin)
  const loginidOnChangeHanlder = (e) => {
    setIdInput((prevInput) => e.target.value);

    if (e.target.value.length === 0) {
      setIdInputMessage((prevText) => "아이디를 입력하세요.");
    } else {
      setIdInputMessage((prevText) => "");
    }
  };

  const pwOnChangeHandler = (e) => {
    setPwInput((prevInput) => e.target.value);

    if (e.target.value.length === 0) {
      setPwInputMessage((prevText) => "비밀번호를 입력하세요.");
    } else {
      setPwInputMessage((prevText) => "");
    }
  };

  const loginButtonHandler = (e) => {
    e.preventDefault();

    if (idInput.length === 0 && pwInput.length === 0) {
      console.log("모든 항목을 입력해야 합니다.");
    }

    axios
      .post(
        url + "/login",

        { user_id: idInput, password: pwInput },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        //console.log(res.data.data)
        localStorage.setItem(
          "ATOKEN",
          JSON.stringify(res.data.data.accessToken)
        );
        dispatch(changeIsLogin(true));
        alert("환영합니다");
        history.push("/");
      });
  };
  //간편가입완료했거나, 예전에 간편가입완료했던 소셜로그인사용자는 자동으로 로그인이 진행되게 하는 함수-hoon
  function socialAutoLogin(id) {
    console.log("socialAutoLogin함수");
    console.log(inputSignUpData.idInput);
    axios({
      url: url + "/sociallogin",
      method: "post",
      data: {
        user_id: id,
      },
    }).then((res) => {
      console.log(res.data.data);
      localStorage.setItem("ATOKEN", JSON.stringify(res.data.data.accessToken));
      dispatch(changeIsLogin(true));
      alert("소셜 로그인 완료, 환영합니다");
      history.push("/");
    });
  }

  function googleLoginButtonHandler() {
    console.log("구글 로그인 버튼 동작 확인");
    if (isLogin) {
      alert("이미 로그인상태입니다.");
    } else {
      window.location.assign(GOOGLE_LOGIN_URL);
    }
  }
  //////////////////socialLogined.page코드//////////////

  const [inputVaildMessage, setInputVaildMessage] = useState({
    idInput: "아이디를 입력해주세요.",
    pwInput: "패스워드를 입력해주세요.",
    nickNameInput: "닉네임을 입력해주세요.",
  });
  const [userRoadAddress, setRoadUserAddress] =
    useState("위 검색창에서 검색해주세요.");
  const { genderToggle } = useSelector((state) => state.itemReducer);
  const [photo, setPhoto] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "blankProfile.png",
    filePath: `${url}/img/blankProfile.png`,
    // fileName: null,
    // filePath: null,
  });

  const idOnChangeHanlder = (key) => (e) => {
    setInputSignUpData({
      ...inputSignUpData,
      [key]: e.target.value,
    });
  };

  //아이디길이가 4자이상인가
  function isMoreThan4Length(word) {
    return word.length >= 4;
  }
  //닉네임 길이 2글자 이상인가
  function nickIsMoreThan4Length(word) {
    return word.length >= 2;
  }

  useEffect(() => {
    //아이디 유효성검사
    if (
      // onlyNumberAndEnglish(inputSignUpData.idInput) &&
      isMoreThan4Length(inputSignUpData.idInput)
    ) {
      setInputVaildMessage({ ...inputVaildMessage, idInput: "" });
    } else {
      setInputVaildMessage({
        ...inputVaildMessage,
        idInput: "사용 불가능한 아이디 입니다.",
      });
    }
  }, [inputSignUpData.idInput]);

  useEffect(() => {
    //닉네임 유효성검사
    if (nickIsMoreThan4Length(inputSignUpData.nickNameInput)) {
      setInputVaildMessage({ ...inputVaildMessage, nickNameInput: "" });
    } else {
      setInputVaildMessage({
        ...inputVaildMessage,
        nickNameInput: "닉네임은 두글자 이상 입니다.",
      });
    }
  }, [inputSignUpData.nickNameInput]);

  function handleComplete(complevent) {
    setRoadUserAddress(complevent.roadAddress);
  }

  function signupFunc(e) {
    console.log("프론트 콘솔:회원가입 입장");
    if (
      inputVaildMessage.idInput ||
      // inputVaildMessage.pwInput ||
      inputVaildMessage.nickNameInput ||
      // pwCheckInputMessage ||
      userRoadAddress === "위 검색창에서 검색해주세요."
    ) {
      console.log("프론트:빈칸을 채워주세요");
    } else {
      console.log("프론트:빈칸 채우기 완료");
      axios({
        url: url + "/users/signup",
        method: "post",
        data: {
          user_id: inputSignUpData.idInput,
          nickName: inputSignUpData.nickNameInput,
          gender: genderToggle,
          location: userRoadAddress,
          user_photo: uploadedImg.filePath,
        },
      }).then((res) => {
        //console.log(res)
        if (res.status === 211) {
          alert("아이디 중복입니다.");
        } else if (res.status === 212) {
          alert("닉네임 중복입니다.!");
        } else if (res.status === 210) {
          alert("회원가입 완료 입니다.");
          socialAutoLogin(inputSignUpData.idInput);
          // dispatch(changeIsLogin(res.data.verified_email))
          // alert("소셜 간편가입 및 소셜 로그인 완료")
          // history.push("/")
        }
      });
    }
  }

  function kakaoLoginHandler() {
    alert("카카오 로그인시 원활한 접속을 위해 전체수신 동의 부탁드립니다:) ");
    const scope = "profile_image, gender, profile_nickname, account_email";
    Kakao.Auth.login({
      scope,
      success: function (response) {
        //console.log(response);
        //Kakao.Auth.setAccessToken(response.access_token)
        //console.log(`get accesstoken: ${Kakao.Auth.getAccessToken()}`)
        //let ACCESS_TOKEN = Kakao.Auth.getAccessToken();
        //사용자 정보가져오기
        Kakao.API.request({
          url: "/v2/user/me",
          success: function ({ kakao_account }) {
            //console.log(kakao_account)
            const { email, profile } = kakao_account;
            let gender = kakao_account.gender !== "female" ? 1 : 2;
            //console.log(gender)
            axios({
              url: url + "/kakaologin",
              method: "post",
              headers: {
                "Content-Type": "application/json",
                authorization: response.access_token,
              },
              data: {
                user_id: email,
                nickName: profile.nickname,
                gender: gender,
                user_Photo: profile.profile_image_url,
              },
            })
              .then((res) => {
                // console.log(res)
                localStorage.setItem(
                  "ATOKEN",
                  JSON.stringify(res.data.data.accessToken)
                );
                dispatch(changeIsLogin(true));
                alert("환영합니다");
                history.push("/");
              })
              .catch((err) => {
                console.log(err);
                alert("카카오 로그인 에러");
              });
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  //아이디 찾기
  function findIdBtn() {
    //   console.log("아이디 찾기 버튼")
    history.push("/findaccount");
  }

  //비밀번호 찾기
  function findPwBtn() {
    console.log("비밀번호 찾기 버튼");
    history.push("/findpassword");
  }
  //회원가입 바로가기
  function signupShortcut() {
    history.push("/signup");
  }

  ////////////////////////////////////////////////
  const onSubmit = (e) => {
    //console.log(e)
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", photo);
    //console.log(formData)
    axios
      .post(url + "/users/photo", formData, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((res) => {
        const { fileName } = res.data;
        setUploadedImg({
          fileName,
          filePath: `${url.slice(0, -4)}/image/${fileName}`,
        });
        alert("사진을 성공적으로 업로드 하였습니다.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addFile = (e) => {
    //console.log(e.target.files[0])
    setPhoto(e.target.files[0]);
  };
  ////////////////////////////////

  return (
    <>
      {socialLogined ? (
        <Outer className="SignUpPageComponent">
          <h2>소셜 로그인 간편 가입</h2>
          <div className="SignUp--center">
            <StyledArticle className="id">
              <InputAndTitle className="inputIdSection">
                <h3>아이디</h3>
                <div>{inputSignUpData.idInput}</div>
              </InputAndTitle>
              <ValidationListBox className="idValidationList">
                <li>{inputVaildMessage.idInput}</li>
              </ValidationListBox>
            </StyledArticle>
            {/* <StyledArticle className="password">
                            <InputAndTitle className="inputPwSection">
                                <h3>비밀번호</h3>
                                <InputText
                                    type="password"
                                    name="pwInput"
                                    placeholder="비밀번호"
                                    onChange={idOnChangeHanlder("pwInput")}
                                />
                            </InputAndTitle>
                            <ValidationListBox className="pwValidationList">
                                <li>{inputVaildMessage.pwInput}</li>
                            </ValidationListBox>
                        </StyledArticle>
                        <StyledArticle className="password">
                            <InputAndTitle className="inputPwSection">
                                <h3>비밀번호 확인</h3>
                                <InputText
                                    type="password"
                                    name="pwCheckInput"
                                    placeholder="비밀번호 확인"
                                    onChange={idOnChangeHanlder2}
                                />
                            </InputAndTitle>
                            <ValidationListBox className="pwValidationList">
                                <li>{pwCheckInputMessage}</li>
                            </ValidationListBox>
                        </StyledArticle> */}
            <StyledArticle className="password">
              <InputAndTitle className="inputPwSection">
                <h3>닉네임</h3>
                <InputText
                  type="text"
                  name="nickNameInput"
                  placeholder="닉네임"
                  onChange={idOnChangeHanlder("nickNameInput")}
                />
              </InputAndTitle>
              <ValidationListBox className="pwValidationList">
                <li>{inputVaildMessage.nickNameInput}</li>
              </ValidationListBox>
            </StyledArticle>
            <StyledArticle className="1">
              <InputAndTitle2 className="2">
                <h3>성별</h3>
                <Toggle />
              </InputAndTitle2>
            </StyledArticle>
            <StyledArticle className="password">
              <InputAndTitle className="inputPwSection">
                <h3>사는곳</h3>
                <DaumPostcode onComplete={handleComplete} />
              </InputAndTitle>
              <ValidationListBox className="pwValidationList">
                {userRoadAddress}
              </ValidationListBox>
            </StyledArticle>
            <StyledArticle className="password">
              <InputAndTitle className="inputPwSection">
                <h3>프로필사진</h3>
                <Buttons2>
                  {/* /////////////////////////////// */}
                  <PhotoUploadSection
                    onSubmit={onSubmit}
                    className="photoUploadSection"
                  >
                    <PhotoBox>
                      {uploadedImg ? (
                        <PhotoBox2 src={uploadedImg.filePath} />
                      ) : (
                        <div></div>
                      )}
                    </PhotoBox>
                    <Button2
                      type="file"
                      className="photoButton"
                      onChange={addFile}
                    />
                    <Button3 type="submit">업로드</Button3>
                  </PhotoUploadSection>
                  {/* /////////////////////////////// */}
                </Buttons2>
              </InputAndTitle>
            </StyledArticle>
          </div>
          <Buttons className="SignUp--buttons">
            <Button onClick={signupFunc}>가입</Button>
          </Buttons>
        </Outer>
      ) : (
        <LoginOuter className="loginPageComponent">
          <h2>로그인</h2>
          <div className="Login--center">
            <LoginStyledArticle className="id">
              <LoginInputAndTitle className="inputIdSection">
                <h3>아이디</h3>
                <LoginInputText
                  type="text"
                  name="idInput"
                  placeholder="아이디를 입력하세요"
                  value={idInput}
                  onChange={loginidOnChangeHanlder}
                />
              </LoginInputAndTitle>
              <LoginValidationListBox className="idValidationList">
                <li>{idInputMessage}</li>
              </LoginValidationListBox>
            </LoginStyledArticle>

            <LoginStyledArticle className="password">
              <LoginInputAndTitle className="inputPwSection">
                <h3>비밀번호</h3>
                <LoginInputText
                  type="password"
                  name="pwInput"
                  placeholder="비밀번호를 입력하세요"
                  value={pwInput}
                  onChange={pwOnChangeHandler}
                />
              </LoginInputAndTitle>
              <LoginValidationListBox className="pwValidationList">
                <li>{pwInputMessage}</li>
              </LoginValidationListBox>
              <FindBtn>
                <span onClick={findIdBtn}>아이디 찾기 | </span>
                <span onClick={findPwBtn}>비밀번호 찾기 | </span>
                <span onClick={signupShortcut}>회원가입</span>
              </FindBtn>
            </LoginStyledArticle>
          </div>

          <LoginButtons className="login--Loginbuttons">
            <LoginButton onClick={loginButtonHandler}>로그인</LoginButton>
            <div>
              {/* 구글 소셜로그인 */}
              <button onClick={googleLoginButtonHandler}>
                <img src={googleIcon}></img>
              </button>
              {/* 카카오 소셜로그인 */}
              <button onClick={kakaoLoginHandler}>
                <img src={kakaoIcon}></img>
              </button>
            </div>
          </LoginButtons>
        </LoginOuter>
      )}
    </>
  );
}
