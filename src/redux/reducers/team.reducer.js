import { types } from "../types"
const APP = "FOOTBALL_APP"

const initialState = {
    //TODO parse the object
    my_team_id: localStorage.getItem(`${APP}-MYTEAM-ID`),

}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.ADD_TO_MY_TEAM:
            localStorage.setItem(`${APP}-MYTEAM-ID`, payload)
            return {
                ...state,
                my_team_id: payload
            }
        default:
            return state
    }
}

