import axios from 'axios';
import { types } from '../types'

const URL = 'https://v2.api-football.com/'

const request = axios.create({
    method: 'get',
    baseURL: URL,
    headers: { 'X-RapidAPI-Key': '980182d5a3626fcf8e91ef098d79aa35' }
})

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
            type: types.ADD_TO_LAST_AND_NEXT_FIXTURES,
            payload: { last_fixtures, next_fixtures }
        })

        // ADD_TO_CURRENT_OR_LAST_FIXTURE
        dispatch({
            type: types.ADD_TO_CURRENT_OR_LAST_FIXTURE_ID,
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
            type: types.ADD_TO_FIXTURE_DETAILS,
            payload: res.data.api.fixtures[0]
        })
    } catch (error) {
        console.log(error);
    }
}

export const get_head_to_head = (team1, team2) => async dispatch => {

    try {
        // const res = await request(`fixtures/h2h/${team1}/${team2}`)
        // console.log(res);
        // dispatch({
        //     type: types.ADD_TO_HEAD_TO_HEAD,
        //     payload: res.data.api.fixtures
        // })
    } catch (error) {
        console.log(error);
    }
}

export const get_predictions = (fixture_id) => async dispatch => {

    try {
        // const res = await request(`predictions/${fixture_id}`,)
        // console.log(res);
        // dispatch({
        //     type: types.ADD_PREDICTION,
        //     payload: res.data.api.predictions[0]
        // })
    } catch (error) {
        console.log(error);
    }
}

