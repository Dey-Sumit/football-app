import axios from 'axios';
import { types } from '../types'

const URL = 'https://v2.api-football.com/'
const SEASON = '2020'
const request = axios.create({
    method: 'get',
    baseURL: URL,
    headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' }
})

// with cancel token
let cancelToken;

export const get_search_results = (term) => async dispatch => {
    dispatch({
        type: types.FETCH_INFO_TEAM
    })

    try {
        if (cancelToken !== undefined)
            cancelToken.cancel("Operation canceled due to new request.");

        //Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        //create an axios instance  
        const request_with_cancel_token = axios.create({
            method: 'get',
            baseURL: URL,
            headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' },
            cancelToken: cancelToken.token //Pass the cancel token to the current request
        })
        const res = await request_with_cancel_token(`teams/search/${term}`)
        dispatch({
            type: types.SET_SEARCHED_RESULTS,
            payload: res.data.api.teams
        })
    } catch (error) {
        console.log(error);
    }
}
//TODO dispatch error for errors

export const get_last_and_next_fixtures = (team_id) => async dispatch => {
    var res;
    try {
        res = await request(`/fixtures/team/${team_id}/last/3`)
        const last_fixtures = res.data.api.fixtures


        res = await request.get(`/fixtures/team/${team_id}/next/5`)
        const next_fixtures = res.data.api.fixtures

        // ADD_TO_LAST_AND_NEXT_FIXTURES
        dispatch({
            type: types.SET_LAST_AND_NEXT_FIXTURES,
            payload: { last_fixtures, next_fixtures }
        })

        // ADD_TO_CURRENT_OR_LAST_FIXTURE
        dispatch({
            type: types.SET_CURRENT_OR_LAST_FIXTURE_ID,
            payload: last_fixtures[0].fixture_id
        })

    } catch (error) {
        console.log(error);
    }
}

export const get_fixture_details = (fixture_id) => async dispatch => {

    try {
        const res = await request(`fixtures/id/${fixture_id}`);

        dispatch({
            type: types.SET_FIXTURE_DETAILS,
            payload: res.data.api.fixtures[0]
        })
    } catch (error) {
        console.log(error);
    }
}

export const get_head_to_head = (team1, team2) => async dispatch => {

    try {
        const res = await request(`fixtures/h2h/${team1}/${team2}`)

        dispatch({
            type: types.SET_HEAD_TO_HEAD,
            payload: res.data.api.fixtures
        })
    } catch (error) {
        console.log(error);
    }
}

export const get_predictions = (fixture_id) => async dispatch => {

    try {
        const res = await request(`predictions/${fixture_id}`,)

        dispatch({
            type: types.SET_PREDICTION,
            payload: res.data.api.predictions[0]
        })
    } catch (error) {
        console.log(error);
    }
}

export const get_domestic_league_id = (team_id) => async dispatch => {
    try {
        const res = await request(`leagues/team/${team_id}/${SEASON}`)
        const leagues = res.data.api.leagues;

        let domestic_league_id;
        for (let x = 0; x < leagues.length; x++) {
            if (leagues[x].type === "League")
                domestic_league_id = leagues[x].league_id;
        }

        dispatch(
            {
                type: types.SET_DOMESTIC_LEAGUE_ID,
                payload: domestic_league_id
            }
        )

    } catch (error) {
        console.log(error.message);
    }
}

export const get_domestic_league_table = (league_id) => async dispatch => {
    try {
        const res = await request(`/leagueTable/${league_id}`);

        dispatch(
            {
                type: types.SET_DOMESTIC_LEAGUE_TABLE,
                payload: res.data.api.standings[0]
            }
        )

    } catch (error) {
        console.log(error.message);
    }
}
export const get_top_players = (league_id) => async dispatch => {

    try {
        const res = await request(`topscorers/${league_id}`);
        dispatch(
            {
                type: types.SET_TOP_PLAYERS,
                payload: res.data.api.topscorers.slice(0, 9)
            }
        )
    } catch (error) {
        console.log(error);
    }
}

export const get_api_status = () => async dispatch => {
    try {
        const res = await request('/status');

        dispatch(
            {
                type: types.SET_API_STATUS,
                payload: res.data.api.status.requests
            }
        )
    } catch (error) {
        console.log(error);
    }
}