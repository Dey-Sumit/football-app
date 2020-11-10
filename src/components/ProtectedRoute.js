import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
const ProtectedRoute = ({ component: Component, ...rest }) => {

    const profile = useSelector(state => state.auth.profile)
    const loading = useSelector(state => state.auth.loading)

    return (
        <Route {...rest} render={
            props =>
                !loading && (!profile ? <Redirect to="/auth" /> :
                    profile?.team ?
                        <Component {...props} /> : <Redirect to="/chooseTeams" />)
        } />
    );
};


// const mapStateToProps = state => ({
//     userId: state.auth.userId,
//     has_profile: state.auth.has_profile,
//     loading: state.auth.loading
// })

// export default connect(mapStateToProps)(ProtectedRoute);
export default ProtectedRoute;
