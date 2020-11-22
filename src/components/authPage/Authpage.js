import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import './authPage.scss'

import Login from './login/Login';
import Register from './register/Register';
import soccer from '../../assets/soccer.svg'
import { Col, Container, Row } from 'react-bootstrap';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <Container className="auth">
            <Row className="auth__container">
                <Col md={6} className="auth__left">
                    <h1>Oh My Goal</h1>
                    <div>
                        {isLogin ?
                            <p className='p-1 mb-1'>If You don't have an account, you can <span onClick={() => setIsLogin(isLogin => !isLogin)}>Register</span> Here </p>
                            :
                            <p className='p-1 mb-1'>If You already have an account, you can <span onClick={() => setIsLogin(isLogin => !isLogin)}>Log in </span>Here </p>
                        }
                        <img src={soccer} alt="soccer" />
                    </div>
                </Col>

                <Col md={6} className="auth__right ">
                    {isLogin === true ? <Login /> : <Register />}
                </Col>
            </Row>
        </Container>


    )
}

// const mapStateToProps = state => ({
//     userId: state.auth.userId,
//     messages: state.auth.messages
// })
// export default connect(mapStateToProps)(AuthPage);
export default AuthPage;