export const initialState = {
    myTeam: null,
    user: null
};

export const types = {
    SET_USER: "SET_USER",
    REMOVE_USER: "REMOVE_USER",
    ADD_TO_MY_TEAM: "ADD_TO_MY_TEAM"
}
const APP_NAME = 'football__app'
const reducer = (state, action) => {
    console.log(action);
    const { type, payload } = action
    switch (type) {

        case types.SET_USER:
            localStorage.setItem(`${APP_NAME}'-user'`, payload.email)
            return {
                ...state,
                user: payload
            }
        case types.REMOVE_USER:
            //TODO remove from local storage    
            return {
                ...state,
                user: null
            }

        case types.ADD_TO_MY_TEAM:
            return {
                ...state,
                myTeam: payload,
            };
        default:
            return state;
    }
};

export default reducer;