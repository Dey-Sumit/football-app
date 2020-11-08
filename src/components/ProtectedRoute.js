import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect, shallowEqual, useSelector } from 'react-redux'
const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log("in port route");


    const { userId, profile, loading } = useSelector(state => ({
        userId: state.auth.userId,
        team: state.auth.profile?.team,
        // loading: state.auth.loading
    }), shallowEqual
    )

    return (
        <Route {...rest} render={
            props =>
                // (!loading && !userId) ? <Redirect to="/auth" />
                //     : <Component {...props} />
                userId ? <Component {...props} /> : <Redirect to="/auth" />
            // !loading && !userId ? <Redirect to="/auth" />
            //     : !loading && !has_profile ? <Redirect to="/choose_teams" /> : <Component {...props} />



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
