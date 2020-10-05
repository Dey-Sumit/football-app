const APP = "FOOTBALL_APP"

export const initialState = {
    myTeam: localStorage.getItem(`${APP}-MYTEAM`),
    // myTeam_name: localStorage.getItem(`${APP}-MYTEAM-NAME`),
    user: localStorage.getItem(`${APP}-USER`),
    user_cred: JSON.parse(localStorage.getItem(`${APP}-USER-CRED`)),
    league_id: 2790
};

export const types = {
    SET_USER: "SET_USER",
    LOG_OUT: "LOG_OUT",
    ADD_TO_MY_TEAM: "ADD_TO_MY_TEAM",
    ADD_USER_CRED: "ADD_USER_CRED"
}

const reducer = (state, action) => {
    // console.log(action);
    const { type, payload } = action
    switch (type) {

        case types.SET_USER:
            localStorage.setItem(`${APP}-USER`, payload)
            return {
                ...state,
                user: payload
            }
        case types.ADD_USER_CRED:
            localStorage.setItem(`${APP}-USER-CRED`, JSON.stringify(payload))
            // localStorage.setItem(`${APP}-USER-CRED`, payload)
            return {
                ...state,
                user_cred: payload
            }
        case types.LOG_OUT:
            localStorage.removeItem(`${APP}-USER`)
            localStorage.removeItem(`${APP}-MYTEAM`)
            return {
                ...state,
                user: null,
                myTeam: null
            }

        case types.ADD_TO_MY_TEAM:
            console.log(type, payload);
            localStorage.setItem(`${APP}-MYTEAM`, JSON.stringify(payload))
            return {
                ...state,
                myTeam: payload,
            };
        default:
            return state;
    }
};

export default reducer;