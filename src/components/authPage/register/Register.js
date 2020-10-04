import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { toast } from 'react-toastify';
import { types } from '../../../context/reducer';
import { useGlobalState } from '../../../context/StateProvider';
//import { auth } from '../../../firebase/firebase';
//import Notification from '../../notification/Notification';

const Register = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useGlobalState();



    const handleClick = () => {
        //TODO check validation of credentials
        // store the cred in global state
        dispatch({
            type: types.ADD_USER_CRED,
            payload: {
                email,
                password
            }
        })
        history.push('/intro');
    }
    //TODO show a loader during register response from server


    return (
        <>
            <form>
                <input type='text' required placeholder="Enter email " value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="form__button" type="submit" onClick={handleClick}>
                    Next
                </button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};

export default Register;