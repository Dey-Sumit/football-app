import { types } from '../types'

// REGISTER USER

const { auth, db } = require("../../firebase/firebase");

const register_user = async (email, password) => {
    console.log("register_user");
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        console.log("RETURNED AUTH ", res);
        console.log("ID ", res.user.uid);
        return res.user.uid;
    } catch (error) {
        console.log(error)
    }


}

const create_or_update_user_in_db = (userId, team_id) => {
    console.log("create_or_update_user_in_db");
    db
        .collection('teams')
        .doc(userId)
        .set(
            {
                team_id: team_id,
            }
        )
        .then(() => {
            //returns nothing :(

        })
        .catch(
            error => {
                console.error(error)
                // toast.error(<Notification message={error.message} />,
                //     { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
                // setLoading(false);

            }
        )
}

export const register = (email, password, team_id) => async (dispatch) => {
    console.log(email, password);
    try {
        const userId = await register_user(email, password)
        await dispatch({
            type: types.REGISTER_SUCCESS,
            payload: userId
        })
        console.log("Reg done ", userId);

        await create_or_update_user_in_db(userId, team_id)
        //? 'await' has no effect on the type of this expression
        console.log("FINALLY DONE");
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: types.REGISTER_FAIL,
            payload: error.message
        })
    }
}

export const login = (email, password) => async dispatch => {
    auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: auth.user.uid,
            });
            //TODO get the team details form db
            dispatch(load_user())
        })
        .catch(error => {
            dispatch({
                type: types.LOGIN_FAIL
            });
            console.log(error.message);
            // setLoading(false)
            // toast.error(<Notification message={error.message} />,
            //     { position: toast.POSITION.TOP_RIGHT, autoClose: false })
        })
}

export const log_out = () => async dispatch => {
    try {
        await auth.signOut();
        dispatch({
            type: types.LOGOUT
        })
    } catch (error) {
        console.log(error);
    }

}

export const check_if_user_exist = (email, password) => async dispatch => {

    console.log(email, password);
    // check if the email is already exists
    auth.fetchSignInMethodsForEmail(email).then(
        data => {
            if (data.length > 0) {
                //! EMAIL IS TAKEN
                // toast.error(<Notification message="This email id is taken" />,
                //     { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });

                dispatch({
                    type: types.IS_USER_EXIST,
                    payload: { valid: false }
                })

            }
            else {
                //! EMAIL IS NOT TAKEN
                dispatch({
                    type: types.IS_USER_EXIST,
                    payload: { email, password, valid: true }
                })
            }

        }
    )
        .catch(error => {
            console.log(error.message);
            // toast.error(<Notification message={error.message} />,
            //     { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })

        })
}

export const load_user = () => (dispatch) => {
    // using local storage

    console.log("load user");

    //using firebase
    auth.onAuthStateChanged(user => {
        if (user) {
            // get the team from db
            db.collection('teams')
                .doc(user.uid)
                .get()
                .then(
                    doc => {

                        dispatch({
                            type: types.ADD_TO_MY_TEAM,
                            payload: doc.data().team_id
                        })

                        dispatch({
                            type: types.LOGIN_SUCCESS,
                            payload: user.uid,
                        })
                        // console.log("User logged in ", user.email);
                    }
                )
                .catch(error => console.log(error.message))
        }
        else {
            console.log("not logged in");
        }
    })
}