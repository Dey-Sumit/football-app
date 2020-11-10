import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { login, sign_in_with_google } from '../../../redux/actions/auth.action'
import { Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Login = () => {

    const history = useHistory();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const { register, errors, handleSubmit } = useForm();


    const loading = useSelector(state => state.auth.loading)
    const userId = useSelector(state => state.auth.userId)

    const dispatch = useDispatch()

    useEffect(() => {
        if (userId)
            history.push('/')
    }, [userId, history])

    // const handleLogIn = e => {
    //     e.preventDefault();

    // }
    const handleClick = (data) => {
        dispatch(login(data.email, data.password));
    }

    const handleOAuth = () => {
        dispatch(sign_in_with_google())
    }


    return (
        <>
            <h4>Log in to oh my goal</h4>

            <form className="d-flex flex-column justify-content-around" onSubmit={handleSubmit(handleClick)}>
                {/* <input type='email' placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} /> */}

                <input type='email' name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Enter Email" className="my-0" />
                {errors.email && errors.email.type === "required" && <span style={{ color: "red" }}>Email is required</span>}
                {errors.email && errors.email.type === "pattern" && <span style={{ color: "red" }}>Enter a valid email</span>}

                <input type='password' name="password" ref={register({ required: true, minLength: 6 })} placeholder="Password" className="my-0" />
                {errors.password && errors.password.type === "required" && <span style={{ color: "red" }}>Password is required</span>}
                {errors.password && errors.password.type === "minLength" && <span style={{ color: "red" }}>minimum length must be 6</span>}


                {/* <span>forgot password</span> */}
                <button type='submit'>
                    {loading ? <Spinner animation="grow" /> : "Sign In"}
                </button>
            </form>
            {/* line */}
            <p><span>or continue with</span></p>

            <button className="o-auth__button" onClick={handleOAuth}>Google</button>
        </>
    );
};

export default Login;