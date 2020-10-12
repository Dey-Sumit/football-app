import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'
const ProtectedRoute = ({ component: Component, user_id, has_profile, loading, ...rest }) => {

    return (
        <Route {...rest} render={
            props =>
                !loading && !user_id ? <Redirect to="/auth" />
                    : !loading && !has_profile ? <Redirect to="/choose_teams" /> : <Component {...props} />


        } />
    );
};


const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    has_profile: state.auth.has_profile,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(ProtectedRoute);
