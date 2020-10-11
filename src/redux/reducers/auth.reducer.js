import { types } from "../types";

const APP = "FOOTBALL_APP"

const initialState = {
    user_id: localStorage.getItem(`${APP}-USER-ID`),
    loading: false,
    user_cred: localStorage.getItem(`${APP}-USER-CRED`),
    messages: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case types.FETCH_INFO_USER:
            return {
                ...state,
                loading: true
            }
        case types.SET_USER_CRED:
            localStorage.setItem(`${APP}-USER-CRED`, JSON.stringify(payload))
            return {
                ...state,
                user_cred: JSON.stringify(payload),
                loading: false
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem(`${APP}-USER-ID`, payload)
            // remove user cred from redux and local storage
            localStorage.removeItem(`${APP}-USER-CRED`)

            return {
                ...state,
                user_id: payload,
                user_cred: null,
                loading: false,

            }

        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT:
            localStorage.removeItem(`${APP}-USER-ID`)
            localStorage.removeItem(`${APP}-USER-CRED`)
            localStorage.removeItem(`${APP}-MYTEAM-ID`)
            return {
                ...state,
                user_id: null,
                loading: false,
                user_cred: null,
                // only one msg at a time
                messages: payload
            }

        default:
            return state
    }
}  