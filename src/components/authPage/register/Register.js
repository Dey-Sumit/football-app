import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { types } from '../../../context/reducer';
import { useGlobalState } from '../../../context/StateProvider';
import { auth } from '../../../firebase/firebase';
import Notification from '../../notification/Notification';

const Register = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useGlobalState();
    const [loading, setLoading] = useState(false)


    const handleRegister = e => {
        e.preventDefault();
        setLoading(true)


        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                console.log(auth.user);
                if (auth) {
                    // put in global state
                    dispatch({
                        type: types.SET_USER,
                        payload: auth.user.email,
                    });
                    history.push('/intro')
                }
            })
            .catch(error => {
                setLoading(false)
                toast.error(<Notification message={error.message} />,
                    { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
            })
    }
    //TODO show a loader during register response from server

    return (
        <>
            <form onSubmit={handleRegister}>
                <input type='text' required placeholder="Hi MeNaldo :)" value={name} onChange={e => setName(e.target.value)} />
                <input type='text' required placeholder="Enter email " value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="form__button" type="submit">
                    {loading ? <Spinner animation="grow" /> : "Register"}
                </button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};

export default Register;