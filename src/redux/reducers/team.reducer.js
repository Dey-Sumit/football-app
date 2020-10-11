import { types } from "../types"
const APP = "FOOTBALL_APP"

const initialState = {
    loading: false,
    my_team_id: localStorage.getItem(`${APP}-MYTEAM-ID`),
    last_and_next_fixtures: [],
    current_or_last_fixture_id: null,
    fixture_details: null,
    head_to_head: null,
    predictions: null,
    domestic_league_id: null,
    top_players: null,
    domestic_league_table: null,
    api_calls: null,
    searched_results: null
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case types.FETCH_INFO_TEAM:
            return {
                ...state,
                loading: true
            }
        case types.RESET_TEAM_STATE:
            return {
                ...initialState,
                my_team_id: null
            }
        case types.SET_MY_TEAM:
            localStorage.setItem(`${APP}-MYTEAM-ID`, payload)
            return {
                ...state,
                my_team_id: payload,
                loading: false
            }

        case types.SET_CURRENT_OR_LAST_FIXTURE_ID:
            return {
                ...state,
                current_or_last_fixture_id: payload,
                loading: false
            }

        case types.SET_LAST_AND_NEXT_FIXTURES:
            return {
                ...state,
                last_and_next_fixtures: payload,
                loading: false
            }

        case types.SET_FIXTURE_DETAILS:
            return {
                ...state,
                fixture_details: payload,
                loading: false
            }

        case types.SET_HEAD_TO_HEAD:
            return {
                ...state,
                head_to_head: payload,
                loading: false
            }

        case types.SET_PREDICTION:
            return {
                ...state,
                predictions: payload,
                loading: false

            }


        case types.SET_DOMESTIC_LEAGUE_ID:
            return {
                ...state,
                domestic_league_id: payload,
                loading: false

            }


        case types.SET_DOMESTIC_LEAGUE_TABLE:
            return {
                ...state,
                domestic_league_table: payload,
                loading: false

            }
        case types.SET_TOP_PLAYERS:
            return {
                ...state,
                top_players: payload,
                loading: false

            }

        case types.SET_API_STATUS:
            return {
                ...state,
                api_calls: payload,
                loading: false
            }
        case types.SET_SEARCHED_RESULTS:
            return {
                ...state,
                searched_results: payload,
                loading: false
            }
        default:
            return state
    }
}

