import React, { useEffect, useState } from 'react';
// import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Notification from '../../notification/Notification';
import { connect } from 'react-redux'
import { login } from '../../../redux/actions/auth.action'
import { auth } from '../../../firebase/firebase';
import { Spinner } from 'react-bootstrap';

const Login = ({ login, loading, user_id }) => {

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


    return (
        <>
            <form>
                <input type='email' placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                <button className="form__button" type='submit' onClick={handleLogIn}>
                    {loading ? <Spinner animation="grow" /> : "Sign In"}
                </button>
            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};
const mapStateToProps = state => ({
    loading: state.auth.loading,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps, { login })(Login);