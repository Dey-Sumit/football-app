import { types } from "../types";

const APP = "FOOTBALL_APP"

const initialState = {
    user_id: localStorage.getItem(`${APP}-USER-ID`),
    loading: false,
    has_profile: false,
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
        case types.HAS_PROFILE:
            return {
                ...state,
                has_profile: payload,
                loading: false
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:

            localStorage.setItem(`${APP}-USER-ID`, payload)

            return {
                ...state,
                user_id: payload,
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
                has_profile: false,
                // only one msg at a time
                messages: payload
            }

        default:
            return state
    }
}  