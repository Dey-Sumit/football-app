import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux'
import { login, sign_in_with_google } from '../../../redux/actions/auth.action'
import { Spinner } from 'react-bootstrap';

const Login = ({ login, sign_in_with_google, loading, userId }) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (userId)
            history.push('/')
    }, [userId, history])

    const handleLogIn = e => {
        e.preventDefault();
        login(email, password);
    }
    const handleOAuth = () => {
        sign_in_with_google()
    }


    return (
        <>
            <h4>Log in to oh my goal</h4>

            <form className="d-flex flex-column justify-content-around" onSubmit={handleLogIn}>
                <input type='email' placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" />
                <input type='password' placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" />
                {/* <span>forgot password</span> */}
                <button type='submit'>
                    {loading ? <Spinner animation="grow" /> : "Sign In"}
                </button>
            </form>
            {/* line */}
            <p><span>or continue with</span></p>

            <button className="o-auth__button" onClick={handleOAuth}>Google</button>
        </>
    );
};
const mapStateToProps = state => ({
    loading: state.auth.loading,
    userId: state.auth.userId
})

export default connect(mapStateToProps, { login, sign_in_with_google })(Login);