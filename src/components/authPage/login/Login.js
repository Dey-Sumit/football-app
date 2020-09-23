import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { types } from '../../../context/reducer';
import { useGlobalState } from '../../../context/StateProvider';
import { auth } from '../../../firebase/firebase';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useGlobalState();
    //TODO show a loader during login response from server

    const handleLogIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                console.log(auth.user);
                if (auth) {
                    dispatch({
                        type: types.SET_USER,
                        payload: auth.user,
                    });
                    history.push('/intro')
                }
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    return (
        <>
            <form>
                <input type='text' placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                <button className="form__button" type='submit' onClick={handleLogIn} className='login__signInButton'>Sign In</button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};

export default Login;