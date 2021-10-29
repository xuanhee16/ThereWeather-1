import { faSatelliteDish } from "@fortawesome/free-solid-svg-icons"
import { CHANGE_USER_INFO, CHANGE_USER_GENDER, CHANGE_IS_LOGIN, UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE, CHANGE_USER_PW } from "../actions/index"
import { initialState } from "./initialState"

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            }

        //     break
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

        default:
            return state
    }
}

export default itemReducer
