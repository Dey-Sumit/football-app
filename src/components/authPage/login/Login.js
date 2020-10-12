import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux'
import { login, sign_in_with_google } from '../../../redux/actions/auth.action'
import { Spinner } from 'react-bootstrap';

const Login = ({ login, sign_in_with_google, loading, user_id }) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (user_id)
            history.push('/')
    }, [user_id, history])

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

            <form>
                <input type='email' placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" />
                <input type='password' placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" />
                {/* <span>forgot password</span> */}
                <button className="form__button" type='submit' onClick={handleLogIn}>
                    {loading ? <Spinner animation="grow" /> : "Sign In"}
                </button>
            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button" onClick={() => handleOAuth()}>Google</button>
        </>
    );
};
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps, { login, sign_in_with_google })(Login);