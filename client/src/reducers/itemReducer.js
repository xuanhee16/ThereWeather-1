import {
    CHANGE_SEARCH_WORD,
    CHANGE_SELECT_WORD,
    CHANGE_USER_INFO,
    CHANGE_USER_GENDER,
    CHANGE_IS_LOGIN,
    UPDATE_CURRENT_PAGE,
    UPDATE_START_END_PAGE,
    CHANGE_USER_PW,
    CHANGE_CUR_LOCATION,
    UPDATE_WEATHERINFO,
    UPDATE_USER_POST
} from "../actions/index"
import { initialState } from "./initialState"


const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            }
        // 새로운기능은 아래양식으로 만들어서 쓸수있다.

        case CHANGE_USER_GENDER:
            return {
                ...state,
                genderToggle: action.payload,
            }

        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                current: action.payload,
            }

        case UPDATE_START_END_PAGE:
            return {
                ...state,
                start: action.payload.start,
                end: action.payload.end,
            }

        case CHANGE_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            }

        case CHANGE_USER_PW:
            return {
                ...state,
                editPassword: action.payload,
            }

        case CHANGE_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.payload,
            }

        case CHANGE_SELECT_WORD:
            return {
                ...state,
                selectWord: action.payload,
            }

        case CHANGE_CUR_LOCATION:
            return {
                ...state,
                curLocation: action.payload,
            }
        case UPDATE_WEATHERINFO: 
            return {
                ...state,
                item: action.payload
            }
        case UPDATE_USER_POST: 
            return {
                ...state,
                postInfo: action.payload
            }

        default:
            return state
    }
}

export default itemReducer
