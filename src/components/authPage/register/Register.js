import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { types } from '../../../context/reducer';
import { useGlobalState } from '../../../context/StateProvider';
import { auth } from '../../../firebase/firebase';
//import { auth } from '../../../firebase/firebase';
import Notification from '../../notification/Notification';

const Register = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, dispatch] = useGlobalState();

    const handleClick = (e) => {
        //TODO check validation of credentials
        e.preventDefault();

        if (password.length < 6) {
            return
            // TODO show message
        }
        // check if the email is already exists
        auth.fetchSignInMethodsForEmail(email).then(
            data => {
                if (data.length > 0) {
                    toast.error(<Notification message="This email id is taken" />,
                        { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
                    return;
                }
                else {
                    // store the cred in global state
                    dispatch({
                        type: types.ADD_USER_CRED,
                        payload: {
                            email,
                            password
                        }
                    })
                    history.push('/teams');
                }

            }
        )
            .catch(error => {

                toast.error(<Notification message={error.message} />,
                    { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
                return

            })


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