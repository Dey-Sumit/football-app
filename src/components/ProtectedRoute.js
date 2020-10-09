import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'
const ProtectedRoute = ({ component: Component, user_id, loading, ...rest }) => {

    return (
        <Route {...rest} render={
            props =>
                !loading && !user_id ? <Redirect to="/auth" /> : <Component {...props} />
        } />
    );
};


const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(ProtectedRoute);
