import React from 'react';
import { useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Notification from '../../notification/Notification';
import { check_if_user_exist } from '../../../redux/actions/auth.action'
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Register = ({ check_if_user_exist, user_cred, loading }) => {
    const history = useHistory();

    const { register, errors, handleSubmit } = useForm();

    // Redirect if valid credentials
    useEffect(() => {
        if (user_cred) {
            history.push('/choose_teams')
        }
    }, [user_cred, history])


    const handleClick = async (data) =>
        await check_if_user_exist(data)


    return (
        <>
            <form onSubmit={handleSubmit(handleClick)}>
                <input type='text' name="name" ref={register({ required: true })} placeholder="Name" autoComplete="on" />
                {errors.name && errors.name.type === "required" && <span style={{ color: "red" }}>Enter your name</span>}

                <input type='email' name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Enter Email " autoComplete="on" />
                {errors.email && errors.email.type === "required" && <span style={{ color: "red" }}>Email is required</span>}
                {errors.email && errors.email.type === "pattern" && <span style={{ color: "red" }}>Enter a valid email</span>}

                <input type='password' name="password" ref={register({ required: true, minLength: 6 })} placeholder="Password" autoComplete="on" />
                {errors.password && errors.password.type === "required" && <span style={{ color: "red" }}>Password is required</span>}
                {errors.password && errors.password.type === "minLength" && <span style={{ color: "red" }}>minimum length must be 6</span>}
                <button className="form__button" type='submit'>
                    {loading ? <Spinner animation="grow" /> : "Next"}
                </button>

            </form>
            <p><span>or continue with</span></p>
            <button className="o-auth__button">Google</button>
        </>
    );
};
const mapStateToProps = state => ({
    user_cred: state.auth.user_cred,
    loading: state.auth.loading,
})

export default connect(mapStateToProps, { check_if_user_exist })(Register);