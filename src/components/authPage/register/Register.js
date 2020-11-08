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
    const { userId, loading } = useSelector(state => state.auth)

    const { register, errors, handleSubmit } = useForm();

    // Redirect if valid credentials
    useEffect(() => {
        if (userId) {
            history.push('/choose_teams')
        }
    }, [userId, history])


    const handleClick = (data) => {
        console.log("clicked");

        dispatch(register_user(data))
    }
    const handleOAuth = () => {
        dispatch(sign_in_with_google())
    }


    return (
        <>
            <h4>Sign Up to oh my goal</h4>
            <form onSubmit={handleSubmit(handleClick)} className="d-flex flex-column justify-content-around">

                <input type='text' name="name" ref={register({ required: true })} placeholder="Name" autoComplete="on" />
                {errors.name && errors.name.type === "required" && <span style={{ color: "red" }}>Enter your name</span>}

                <input type='email' name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Enter Email " autoComplete="on" />
                {errors.email && errors.email.type === "required" && <span style={{ color: "red" }}>Email is required</span>}
                {errors.email && errors.email.type === "pattern" && <span style={{ color: "red" }}>Enter a valid email</span>}

                <input type='password' name="password" ref={register({ required: true, minLength: 6 })} placeholder="Password" autoComplete="on" />
                {errors.password && errors.password.type === "required" && <span style={{ color: "red" }}>Password is required</span>}
                {errors.password && errors.password.type === "minLength" && <span style={{ color: "red" }}>minimum length must be 6</span>}

                <button className="form__button" type='submit'>
                    {loading ? <Spinner animation="grow" /> : "Sign Up"}
                </button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button" onClick={handleOAuth}>Google</button>
        </>
    );
};
// const mapStateToProps = state => ({
//     userId: state.auth.userId,
//     loading: state.auth.loading,
// })

// export default connect(mapStateToProps, { register_user, sign_in_with_google })(Register);
export default Register;