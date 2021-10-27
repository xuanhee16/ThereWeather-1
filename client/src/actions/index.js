// action types
export const CHANGE_USER_INFO = "CHANGE_USER_INFO"
export const CHANGE_USER_GENDER = "CHANGE_USER_GENDER"

// actions creator functions

export const changeUser = (userinfo) => {
    return {
        type: CHANGE_USER_INFO,
        payload: {
            ...userinfo,
        },
    }
}

export const changeGender = (usergender) => {
    return {
        type: CHANGE_USER_GENDER,
        payload: usergender,
    }
}
