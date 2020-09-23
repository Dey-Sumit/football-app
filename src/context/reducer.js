export const initialState = {
    myTeams: [],
    user: null
};

export const types = {
    SET_USER: "SET_USER",
    REMOVE_USER: "REMOVE_USER",
    ADD_TO_MY_TEAMS: "ADD_TO_MY_TEAMS",
    REMOVE_FROM_MY_TEAMS: "REMOVE_FROM_MY_TEAMS",
}

const reducer = (state, action) => {
    console.log(action);
    const { type, payload } = action
    switch (type) {

        case types.SET_USER:
            //TODO save in local storage
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

        case types.ADD_TO_MY_TEAMS:
            return {
                ...state,
                myTeams: [...state.myTeams, payload],
            };

        case types.REMOVE_FROM_MY_TEAMS:
            const index = state.myTeams.findIndex(item => item.id === payload)
            console.log(index);
            let newTeams = [...state.myTeams]
            newTeams.splice(index, 1)
            console.log(newTeams);
            return {
                ...state,
                myTeams: newTeams

            }
        default:
            return state;
    }
};

export default reducer;