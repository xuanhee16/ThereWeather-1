import { CHANGE_USER_INFO } from "../actions/index"
import { UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE } from "../actions/index"
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
        // case CHANGE_USER_INFO:
        //     break
        case UPDATE_CURRENT_PAGE: 
          return {
              ...state,
              current: action.payload
          } 
        case UPDATE_START_END_PAGE:
            return {
                ...state, 
                start: action.payload.start,
                end: action.payload.end
            }
        default:
            return state
    }
}

export default itemReducer
