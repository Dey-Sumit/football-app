import React, { useEffect, useState } from 'react';
import './authPage.scss'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'

import Login from './login/Login';
import Register from './register/Register';
import soccer from '../../assets/soccer.svg'

function AuthPage({ user_id, messages }) {
    const history = useHistory();

    useEffect(() => {
        // if (user_id) {
        //     console.log("user_id auth page");
        //     history.push('/')
        // }
    }, [user_id, history])

    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="auth">
            <div className="auth__container row">
                <div className="auth__left col-md-6">
                    <h1>Oh My Goal</h1>
                    <div className="auth__hero">
                        {isLogin ?
                            <p>If You don't have an account, you can <span onClick={() => setIsLogin(isLogin => !isLogin)}>Register</span> Here </p> :
                            <p>If You already have an account, you can <span onClick={() => setIsLogin(isLogin => !isLogin)}>Log in </span>Here </p>
                        }
                        <img src={soccer} alt="soccer" />
                    </div>

                </div>
                <div className="auth__right col-md-6">
                    {messages &&
                        <div className="auth__message">
                            <span>{messages}</span>
                        </div>}
                    {isLogin === true ? <Login /> : <Register />}
                </div>
            </div>
        </div>


    )
}

const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    messages: state.auth.messages
})
export default connect(mapStateToProps)(AuthPage);