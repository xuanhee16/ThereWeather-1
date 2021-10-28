import axios from "axios"
import { useHistory } from "react-router-dom"

// action types
export const CHANGE_USER_INFO = "CHANGE_USER_INFO"
export const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE"
export const UPDATE_START_END_PAGE = "UPDATE_START_END_PAGE"

export const SIGNIN_USER = "SIGNIN_USER"
export const LOGGEDIN_USER = "LOGGEDIN_USER"
export const SIGNUP_USER = "SIGNUP_USER"
export const CHANGE_USER_GENDER = "CHANGE_USER_GENDER"
export const CHANGE_IS_LOGIN = "CHANGE_IS_LOGIN"

// export const LOGIN_USER = "LOGIN_USER"



// actions creator functions
export const changeUser = (userinfo) => {
    return {
        type: CHANGE_USER_INFO,
        payload: {
            ...userinfo,
        },
    }
}
export const updateCurrentPage = (current) => {
    return {
        type: UPDATE_CURRENT_PAGE,
        payload: {
            current,
        },
    }
}
export const updateStartEndPage = (start, end) => {
    return {
        type: UPDATE_START_END_PAGE,
        payload: {
            start,
            end,
        },
    }
}

//홈 바로가기
export const Home = (history) => () => {
    history.push("/home")
}
//로그인 화면 바로가기 
export const Login = (history) => () => {
    history.push("/login")
}


//로그인된 상태 
export const loggedInUser = (accessToken, path) => {
    return {
      type: LOGGEDIN_USER,
      accessToken,
      path
    };
  };

//로그인
export const signInUser = (userInfoId, userInfoPw, history) => (dispatch) => {
  dispatch({
    type: SIGNIN_USER
  })
  axios.post("http://localhost/users/login",
  { user_id: userInfoId.user_id, password: userInfoPw.password },
  { headers: { "Content-Type" : "application/json" }, withCredentials: true })
  .then((res) => {
      dispatch(loggedInUser(res.data.data.accessToken))
      dispatch(Home(history))  
  })
}

//회원가입 
export const signUpUser = (data, history) => (dispatch) => {
  axios.post("http://localhost/users/signup", data, {
  headers: { "Content-Type": "application/json" }, withCredentials: true })
  .then((res) => {
      //console.log(res.data)
      dispatch({ 
        type: SIGNUP_USER 
       })
      dispatch(Login(history))
  })
}


// export const loginUser = (data) => {
//   const loginDate = axios.post("http://localhost:3000/login", data)
//   .then(res => res.data)
//   return {
//       type: LOGIN_USER,
//       payload: loginDate
//   }
// }

export const changeGender = (usergender) => {
    return {
        type: CHANGE_USER_GENDER,
        payload: usergender,
    }
}
export const changeIsLogin = (trueOrFalse) => {
    return {
        type: CHANGE_IS_LOGIN,
        payload: trueOrFalse,
    }
}
