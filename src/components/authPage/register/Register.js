import React from 'react';
import { useHistory } from 'react-router-dom';

import { register_user, sign_in_with_google } from '../../../redux/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Register = () => {

    const history = useHistory();
    const dispatch = useDispatch()

    const userId = useSelector(state => state.auth.userId)
    const loading = useSelector(state => state.auth.loading)
    const registerError = useSelector(state => state.auth.error?.registerError)

    const { register, errors, handleSubmit } = useForm();

    // Redirect if valid credentials
    useEffect(() => {
        if (!loading && userId) {
            history.push('/chooseTeam')
        }
    }, [userId, history, loading])


    const handleClick = (data) => {
        dispatch(register_user(data))
    }

    const handleOAuth = () => {
        dispatch(sign_in_with_google())
    }


    return (
        <>
            {registerError &&
                <span className="text-danger">{registerError}</span>
            }
            <h4>Sign Up to oh my goal</h4>
            <form onSubmit={handleSubmit(handleClick)} className="d-flex flex-column justify-content-around">

                <input type='text' name="name" ref={register({ required: true })} placeholder="Name" />
                {errors.name?.type === "required" && <span className="text-danger">Enter your name</span>}

                <input type='email' name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Enter Email " />
                {errors.email && errors.email.type === "required" && <span className="text-danger">Email is required</span>}
                {errors.email?.type === "pattern" && <span className="text-danger">Enter a valid email</span>}
                {/* {errors.email && errors.email.type === "pattern" && <span className="text-danger">Enter a valid email</span>} */}

                <input type='password' name="password" ref={register({ required: true, minLength: 6 })} placeholder="Password" />
                {errors.password?.type === "required" && <span className="text-danger">Password is required</span>}
                {errors.password?.type === "minLength" && <span className="text-danger">minimum length must be 6</span>}

                <button className="form__button" type='submit'>
                    {loading ? <Spinner animation="grow" /> : "Sign Up"}
                </button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button" onClick={handleOAuth}>Google</button>
        </>
    );
};

export default Register;