import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { types } from '../../../context/reducer';
import { useGlobalState } from '../../../context/StateProvider';
import { auth } from '../../../firebase/firebase';

const Register = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useGlobalState();


    const handleRegister = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                console.log(auth.user);
                if (auth) {
                    // put in global state
                    dispatch({
                        type: types.SET_USER,
                        payload: auth,
                    });
                    history.push('/intro')
                }
            })
            .catch(error => alert(error.message))
    }
    //TODO show a loader during register response from server

    return (
        <>
            <form>
                <input type='text' placeholder="Hi MeNaldo :)" value={name} onChange={e => setName(e.target.value)} />
                <input type='text' placeholder="Enter email " value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="form__button" onClick={handleRegister} className='login__registerButton'>Create your Account</button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};

export default Register;