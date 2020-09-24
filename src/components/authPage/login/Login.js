import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { types } from '../../../context/reducer';
import { useGlobalState } from '../../../context/StateProvider';
import { auth } from '../../../firebase/firebase';
import Notification from '../../notification/Notification';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useGlobalState();
    //TODO show a loader during login response from server
    const [loading, setLoading] = useState(false)
    const handleLogIn = e => {
        e.preventDefault();
        setLoading(true)

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                dispatch({
                    type: types.SET_USER,
                    payload: auth.user.email,
                });
                history.push('/intro')
            })
            .catch(error => {
                setLoading(false)
                toast.error(<Notification message={error.message} />,
                    { position: toast.POSITION.TOP_RIGHT, autoClose: false })
            })
    }

    return (
        <>
            <form>
                <input type='text' placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
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

export default Login;