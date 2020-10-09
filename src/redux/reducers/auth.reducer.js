import { types } from "../types";

const APP = "FOOTBALL_APP"

const initialState = {

    user_id: localStorage.getItem(`${APP}-USER-ID`),
    loading: false,
    user_cred: null,
    //TODO FIX messages and show alerts
    messages: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case types.FETCH_INFO:
            return {
                ...state,
                loading: true
            }
        case types.IS_USER_EXIST:
            //TODO set in local storage
            return {
                ...state,
                user_cred: payload
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem(`${APP}-USER-ID`, payload)
            return {
                ...state,
                user_id: payload,
                loading: false
            }

        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.LOGOUT:
            console.log(payload);
            localStorage.removeItem(`${APP}-USER-ID`)
            localStorage.removeItem(`${APP}-MYTEAM-ID`)
            return {
                ...state,
                user_id: null,
                loading: false,
                // only one msg at a time
                messages: payload
            }

        default:
            return state
    }
}