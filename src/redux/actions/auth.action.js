import { types } from '../types'
import store from '../store';
import firebase from 'firebase'
// REGISTER USER

const { auth, db } = require("../../firebase/firebase");


export const create_or_update_user_in_db = (userId, team_id) => async dispatch => {
    try {
        db
            .collection('teams')
            .doc(userId)
            .set(
                {
                    team_id: team_id,
                }
            )
        dispatch({
            type: types.HAS_PROFILE,
            payload: true
        })
    } catch (error) {
        console.error(error)
    }
}

export const register_user = ({ email, password }) => async (dispatch) => {
    // set loading true
    console.log("reg user");
    dispatch({ type: types.FETCH_INFO_USER })

    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        console.log(res);
        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: res.user.uid
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: types.REGISTER_FAIL,
            payload: error.message
        })
    }
}

export const login = (email, password) => async dispatch => {
    console.log("login creator");
    // set loading true
    dispatch({ type: types.FETCH_INFO_USER })
    auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: auth.user.uid,
            });
            // this will also get the team details form db

            dispatch(load_user())

        })
        .catch(error => {
            dispatch({
                type: types.LOGIN_FAIL,
                payload: error.message
            });

        })
}

export const log_out = () => async dispatch => {
    try {
        await auth.signOut();
        dispatch({
            type: types.RESET_TEAM_STATE
        })

        dispatch({
            type: types.LOGOUT
        })

    } catch (error) {
        console.log(error);
    }

}

// export const check_if_user_exist = (data) => async dispatch => {
//     const { name, email, password } = data;
//     dispatch({
//         type: types.FETCH_INFO_USER
//     })


//     dispatch({ type: types.FETCH_INFO_USER })

//     // check if the email is already exists
//     try {
//         const data = await auth.fetchSignInMethodsForEmail(email)
//         if (data.length > 0) {
//             //! EMAIL IS TAKEN
//             dispatch({
//                 type: types.REGISTER_FAIL,
//                 payload: "Email is taken :( Try another one"
//             })
//         }
//         else {
//             console.log("email not taken");
//             //! EMAIL IS NOT TAKEN
//             dispatch({
//                 type: types.SET_USER_CRED,
//                 payload: { name, email, password }
//             })
//         }
//     }
//     catch (error) {

//         console.log(error.message);
//         dispatch({
//             types: types.REGISTER_FAIL,
//             payload: error.message
//         })
//     }
// }

export const load_user = () => (dispatch) => {
    // using local storage
    dispatch({
        type: types.FETCH_INFO_USER
    })
    console.log("load user---------");

    //using firebase
    try {
        auth.onAuthStateChanged(async user => {
            if (user) {
                const doc = await db.collection('teams').doc(user.uid).get()
                if (doc.exists) {
                    dispatch({
                        type: types.SET_MY_TEAM,
                        payload: doc.data().team_id
                    })
                    dispatch({
                        type: types.HAS_PROFILE,
                        payload: true
                    })
                }

                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: user.uid,
                })

            } else {
                dispatch({
                    type: types.LOGIN_FAIL,
                })
            }
        }
        )
    }
    catch (error) {
        console.log(error.message)
    }

}

export const sign_in_with_google = () => async dispatch => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {

        var user = result.user;
        console.log(user.uid);

        // onAuthStateChanged will automatically detects login
    }).catch(function (error) {

        var errorMessage = error.message;

        console.log(errorMessage);
        // ...
    });
}

export const save_changes = () => async dispatch => {
    const { user_id } = store.getState().auth
    const { my_team_id } = store.getState().team
    try {
        await db
            .collection('teams')
            .doc(user_id)
            .set(
                {
                    team_id: my_team_id,
                }
            )
        return true

    } catch (error) {
        console.error(error)
    }

}