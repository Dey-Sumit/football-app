import React, { useState } from 'react';
// import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Notification from '../../notification/Notification';
import { connect } from 'react-redux'
import { login } from '../../../redux/actions/auth.action'

const Login = ({ login }) => {

    // const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //TODO show a loader during login response from server
    // const [loading, setLoading] = useState(false)

    const handleLogIn = e => {
        e.preventDefault();
        login(email, password);
    }


    return (
        <>
            <form>
                <input type='text' placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                <button className="form__button" type='submit' onClick={handleLogIn}>
                    {/* {loading ? <Spinner animation="grow" /> : "Sign In"} */}
                    SignIn
                </button>
            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};

export default connect(null, { login })(Login);