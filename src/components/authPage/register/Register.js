import React from 'react';
import { useHistory } from 'react-router-dom';

import { register_user, sign_in_with_google } from '../../../redux/actions/auth.action'
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Register = ({ register_user, sign_in_with_google, user_id, loading }) => {
    const history = useHistory();

    const { register, errors, handleSubmit } = useForm();

    // Redirect if valid credentials
    useEffect(() => {
        if (user_id) {
            console.log("user id effect");
            history.push('/choose_teams')
        }
    }, [user_id, history])


    const handleClick = (data) => {
        console.log("clicked");
        register_user(data)
    }
    const handleOAuth = () => {
        sign_in_with_google()
    }


    return (
        <>
            <h4>Sign Up to oh my goal</h4>
            <form onSubmit={handleSubmit(handleClick)}>
                {/* <input type='text' name="name" ref={register({ required: true })} placeholder="Name" autoComplete="on" />
                {errors.name && errors.name.type === "required" && <span style={{ color: "red" }}>Enter your name</span>} */}

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
            <button className="o-auth__button" onClick={() => handleOAuth()}>Google</button>
        </>
    );
};
const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    loading: state.auth.loading,
})

export default connect(mapStateToProps, { register_user, sign_in_with_google })(Register);