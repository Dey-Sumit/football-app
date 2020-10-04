import React, { useEffect, useState } from 'react';
import './authPage.scss'
import { useHistory } from "react-router-dom";
import Login from './login/Login';
import { useGlobalState } from '../../context/StateProvider';
import Register from './register/Register';
import soccer from '../../assets/soccer.svg'
import { auth } from '../../firebase/firebase';
import { types } from '../../context/reducer';

function AuthPage() {
    const history = useHistory();
    // const [{ user }] = useGlobalState();

    const [, dispatch] = useGlobalState()

    useEffect(() => {
        //listen for auth status changes
        auth.onAuthStateChanged(user => {
            //if user== null;user logs out
            if (user) {
                console.log("User logged in ", user);
                dispatch(
                    {
                        type: types.SET_USER,
                        payload: user.uid,
                    }
                )
                history.push('/intro')
            } else {
                console.log("User logged out");
            }
        })
    }, [dispatch, history])

    const [isLogin, setIsLogin] = useState(true)


    return (
        <div className="container auth">
            <div className="auth__wrapper row">
                <div className="auth__left col-md-6">
                    <h1>Oh My Goal</h1>
                    <div className="auth__hero">
                        {isLogin ? <p>If You don't have an account, you can <span onClick={() => setIsLogin(!isLogin)}>Register</span> Here </p> :
                            <p>If You already have an account, you can <span onClick={() => setIsLogin(!isLogin)}>Log in </span>Here </p>
                        }
                        <img src={soccer} alt="soccer" />
                    </div>

                </div>
                <div className="auth__right col-md-6">
                    {isLogin === true ? <Login /> : <Register />}
                </div>
            </div>
        </div>


    )
}

export default AuthPage