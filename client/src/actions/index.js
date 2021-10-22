// action types
export const CHANGE_USER_INFO = "CHANGE_USER_INFO"

// actions creator functions

export const changeUser = (userinfo) => {
    return {
        type: CHANGE_USER_INFO,
        payload: {
            ...userinfo,
        },
    }
}

