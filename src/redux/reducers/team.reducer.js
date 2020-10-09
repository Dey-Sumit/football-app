import { types } from "../types"
const APP = "FOOTBALL_APP"

const initialState = {
    //TODO parse the object
    my_team_id: localStorage.getItem(`${APP}-MYTEAM-ID`),
    last_and_next_fixtures: [],
    current_or_last_fixture_id: null,
    loading: true,
    fixture_details: null,
    head_to_head: null,
    predictions: null,
    domestic_league_id: null,
    top_players: null,
    domestic_league_table: null,
    api_calls: null
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.ADD_TO_MY_TEAM:
            localStorage.setItem(`${APP}-MYTEAM-ID`, payload)
            return {
                ...state,
                my_team_id: payload,
                loading: false
            }

        case types.ADD_TO_CURRENT_OR_LAST_FIXTURE_ID:
            console.log(payload);
            return {
                ...state,
                current_or_last_fixture_id: payload,
                loading: false
            }

        case types.ADD_TO_LAST_AND_NEXT_FIXTURES:
            return {
                ...state,
                last_and_next_fixtures: payload,
                loading: false
            }

        case types.ADD_TO_FIXTURE_DETAILS:
            return {
                ...state,
                fixture_details: payload,
                loading: false
            }

        case types.ADD_TO_HEAD_TO_HEAD:
            return {
                ...state,
                head_to_head: payload,
                loading: false
            }

        case types.ADD_PREDICTION:
            return {
                ...state,
                predictions: payload
            }


        case types.SET_DOMESTIC_LEAGUE_ID:
            return {
                ...state,
                domestic_league_id: payload
            }


        case types.SET_DOMESTIC_LEAGUE_TABLE:
            return {
                ...state,
                domestic_league_table: payload
            }
        case types.SET_TOP_PLAYERS:
            return {
                ...state,
                top_players: payload
            }

        case types.SET_API_STATUS:
            return {
                ...state,
                api_calls: payload
            }
        default:
            return state
    }
}

