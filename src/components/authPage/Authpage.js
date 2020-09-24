import React, { useState } from 'react';
import './authPage.scss'
import { Link, useHistory } from "react-router-dom";
import Login from './login/Login';
import { useGlobalState } from '../../context/StateProvider';
import Register from './register/Register';
import soccer from '../../assets/soccer.svg'

function AuthPage() {
    const history = useHistory();
    const [{ user }] = useGlobalState();
    if (user) {
        history.push('/intro')
    }

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