import React, { useEffect, useState } from 'react';
import './authPage.scss'
import { useHistory } from "react-router-dom";
import Login from './login/Login';
import Register from './register/Register';
import soccer from '../../assets/soccer.svg'

import { connect } from 'react-redux'


function AuthPage({ user_id }) {
    const history = useHistory();
    useEffect(() => {

        if (user_id) {
            history.push('/')
        }
    }, [user_id, history])


    const [isLogin, setIsLogin] = useState(true)


    return (
        <div className="container auth">
            <div className="auth__wrapper row">
                <div className="auth__left col-md-6">
                    <h1>Oh My Goal</h1>
                    <div className="auth__hero">
                        {isLogin ? <p>If You don't have an account, you can <span onClick={() => setIsLogin(isLogin => !isLogin)}>Register</span> Here </p> :
                            <p>If You already have an account, you can <span onClick={() => setIsLogin(isLogin => !isLogin)}>Log in </span>Here </p>
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

const mapStateToProps = state => ({
    user_id: state.auth.user_id
})
export default connect(mapStateToProps)(AuthPage);