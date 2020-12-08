import { types } from "../types"

const APP = "FOOTBALL_APP"

const initialState = {
   userId: localStorage.getItem(`${APP}-USER-ID`), // can be null
   loading: false,
   // set in localStorage
   profile: null,
   error: null,
   profileLoaded: false,
}

export default function (state = initialState, action) {
   const { type, payload } = action
   switch (type) {
      case types.FETCH_INFO_USER:
         return {
            ...state,
            loading: true,
         }
      case types.LOGIN_REQUEST:
      case types.REGISTER_REQUEST:
         return {
            ...state,
            loading: true,
         }
      case types.SET_PROFILE:
         return {
            ...state,
            profile: payload,
            loading: false,
            profileLoaded: true,
         }
      case types.REGISTER_SUCCESS:
      case types.LOGIN_SUCCESS:
         localStorage.setItem(`${APP}-USER-ID`, payload)

         return {
            ...state,
            userId: payload,
            loading: false,
            error: null,
         }

      case types.REGISTER_FAIL:
      case types.LOGIN_FAIL:
      case types.LOGOUT:
         localStorage.removeItem(`${APP}-USER-ID`)
         localStorage.removeItem(`${APP}-MYTEAM`)
         return {
            ...state,
            userId: null,
            loading: false,
            profile: null,
            // only one msg at a time
            error: payload,
         }

      default:
         return state
   }
}
