import { types } from '../types'
import firebase from 'firebase/app'

import { db, auth } from '../../firebase/firebase';
// REGISTER USER

export const create_profile = (userId, email, name) => async (dispatch) => {
    console.log("create profile");
    try {
        await db
            .collection('profiles')
            .doc(userId)
            .set(
                {
                    email,
                    name,
                    team: null
                    // email:getState().user.email,
                    // name:getState().user
                }
            )
        dispatch({
            type: types.SET_PROFILE,
            //TODO fix this
            payload: true
        })
    }
    catch (error) {
        console.error(error)
    }
}

export const update_profile = () => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const team = getState().apiData.myTeam
    try {
        await db
            .collection('profiles')
            .doc(userId)
            .update(
                {
                    team: team
                }

            )
        const doc = await db.collection('profiles').doc(userId).get()
        dispatch({
            type: types.SET_PROFILE,
            payload: doc.data()
        })
    } catch (error) {
        console.error(error)
    }
}

export const register_user = (data) => async (dispatch) => {

    const { email, password, name } = data
    // set loading true
    dispatch({ type: types.FETCH_INFO_USER })

    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        dispatch({
            type: types.REGISTER_SUCCESS,
            payload: res.user.uid
        })
        dispatch(create_profile(res.user.uid, email, name))

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: types.REGISTER_FAIL,
            payload: { registerError: error.message }
        })
    }
}

export const login = (email, password) => async dispatch => {
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
                payload: { loginError: error.message }
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
                const doc = await db.collection('profiles').doc(user.uid).get()
                if (doc.exists) {
                    dispatch({
                        type: types.SET_MY_TEAM,
                        payload: doc.data().team
                    })
                    dispatch({
                        type: types.SET_PROFILE,
                        payload: doc.data()
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
    try {
        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result.user);
        var { displayName, email, uid } = result.user;
        console.log(displayName, email, uid);
        // dispatch(create_profile)
        const doc = await db.collection('profiles').doc(uid).get()
        // check if the user exists
        if (doc.exists) {
            dispatch({
                type: types.SET_MY_TEAM,
                payload: doc.data().team
                // TODO FIX; team is not only id in <Team/> component 
                // team might be null,in that case he would be redirected to choose team page
            })
            dispatch({
                type: types.SET_PROFILE,
                payload: doc.data()
            })
        }
        else {
            dispatch(create_profile(uid, email, displayName))
        }


        // dispatch({
        //     type: types.LOGIN_SUCCESS,
        //     payload: uid,
        // })
        // onAuthStateChanged will automatically detects login

    } catch (error) {

    }
    // }).catch(function (error) {

    //     var errorMessage = error.message;

    //     console.log(errorMessage);
    //     // ...
    // });
}

// export const save_changes = () => async (dispatch, getState) => {
//     const { userId } = getState().auth
//     const { myTeam } = getState().apiData.myTeam
//     try {
//         await db
//             .collection('teams')
//             .doc(userId)
//             .set(
//                 my_team
//             )
//         return true

//     } catch (error) {
//         console.error(error)
//     }

//}