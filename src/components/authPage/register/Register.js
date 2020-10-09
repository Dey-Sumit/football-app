import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Notification from '../../notification/Notification';
import { check_if_user_exist } from '../../../redux/actions/auth.action'
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const Register = ({ check_if_user_exist, user_cred, loading }) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Redirect if valid credentials
    useEffect(() => {
        if (user_cred?.valid) {
            history.push('/choose_teams')
        }
    }, [user_cred, history])


    const handleClick = (e) => {
        //TODO check validation of credentials
        e.preventDefault();
        if (password.length < 6) {
            console.log("Password weak");
            return
            // TODO show message
        }
        if (password !== confirmPassword) {
            alert('unmatched !')
            return
        }

        check_if_user_exist(email, password)
    }
    //TODO show a loader during register response from server



    return (
        <>

            <form>
                <input type='email' required placeholder="Enter Email " value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type='password' required placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

                <button className="form__button" type='submit' onClick={handleClick}>
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
    loading: state.auth.loading
})

export default connect(mapStateToProps, { check_if_user_exist })(Register);