import { CHANGE_USER_INFO } from "../actions/index"
import { initialState } from "./initialState"

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            }

            break
        // 새로운기능은 아래양식으로 만들어서 쓸수있다.
        // case CHANGE_USER_INFO:
        //     break

        default:
            return state
    }
}

export default itemReducer