import axios from 'axios';
import { types } from '../types'
// console.log(process.env.REACT_APP_FOOTBALL_API_KEY);
const URL = 'https://v2.api-football.com/'
const SEASON = '2020'
const request = axios.create({
    method: 'get',
    baseURL: URL,
    headers: { 'X-RapidAPI-Key': process.env.REACT_APP_FOOTBALL_API_KEY }
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
            headers: { 'X-RapidAPI-Key': process.env.REACT_APP_FOOTBALL_API_KEY },
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

export const get_last_and_next_fixtures = (teamId) => async dispatch => {
    console.log(teamId);
    var res;
    try {
        res = await request(`/fixtures/team/${teamId}/last/3`)

        const lastFixtures = res.data.api.fixtures


        res = await request.get(`/fixtures/team/${teamId}/next/5`)
        const nextFixtures = res.data.api.fixtures

        // ADD_TO_LAST_AND_NEXT_FIXTURES
        dispatch({
            type: types.SET_LAST_AND_NEXT_FIXTURES,
            payload: { lastFixtures, nextFixtures }
        })

        // ADD_TO_CURRENT_OR_LAST_FIXTURE
        dispatch({
            type: types.SET_CURRENT_OR_LAST_FIXTURE_ID,
            payload: lastFixtures[0].fixture_id
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

export const get_domestic_league_id = (teamId) => async dispatch => {
    try {
        const res = await request(`leagues/team/${teamId}/${SEASON}`)
        const leagues = res.data.api.leagues;

        let domesticLeagueId;
        for (let x = 0; x < leagues.length; x++) {
            if (leagues[x].type === "League")
                domesticLeagueId = leagues[x].league_id;
        }

        dispatch(
            {
                type: types.SET_DOMESTIC_LEAGUE_ID,
                payload: domesticLeagueId
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