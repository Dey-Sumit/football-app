import { types } from "../types"
const APP = "FOOTBALL_APP"
const initialState = {
    loading: false,
    myTeam: localStorage.getItem(`${APP}-MYTEAM`) ?
        JSON.parse(localStorage.getItem(`${APP}-MYTEAM`)) :
        null,
    lastAndNextFixtures: [],
    currentOrLastFixtureId: null,
    fixtureDetails: null,
    headToHead: null,
    predictions: null,
    domesticLeagueId: null,
    topPlayers: null,
    domesticLeagueTable: null,
    apiCalls: null,
    searchedResults: null
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
                myTeam: null
            }
        case types.SET_MY_TEAM:
            localStorage.setItem(`${APP}-MYTEAM`, JSON.stringify(payload))
            return {
                ...state,
                myTeam: payload,
                loading: false
            }

        case types.SET_CURRENT_OR_LAST_FIXTURE_ID:
            return {
                ...state,
                currentOrLastFixtureId: payload,
                loading: false
            }

        case types.SET_LAST_AND_NEXT_FIXTURES:
            return {
                ...state,
                lastAndNextFixtures: payload,
                loading: false
            }

        case types.SET_FIXTURE_DETAILS:
            return {
                ...state,
                fixtureDetails: payload,
                loading: false
            }

        case types.SET_HEAD_TO_HEAD:
            return {
                ...state,
                headToHead: payload,
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
                domesticLeagueId: payload,
                loading: false

            }


        case types.SET_DOMESTIC_LEAGUE_TABLE:
            return {
                ...state,
                domesticLeagueTable: payload,
                loading: false

            }
        case types.SET_TOP_PLAYERS:
            return {
                ...state,
                topPlayers: payload,
                loading: false

            }

        case types.SET_API_STATUS:
            return {
                ...state,
                apiCalls: payload,
                loading: false
            }
        case types.SET_SEARCHED_RESULTS:
            return {
                ...state,
                searchedResults: payload,
                loading: false
            }
        default:
            return state
    }
}

