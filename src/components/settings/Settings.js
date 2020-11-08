import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Notification from '../notification/Notification'

import Search from '../search/Search';
import firebase from 'firebase'
import './settings.scss'
import { useDispatch, useSelector } from 'react-redux'
import { log_out, save_changes } from '../../redux/actions/auth.action'
import { get_api_status } from '../../redux/actions/team.action'
import Navbar from '../navbar/Navbar';

const Settings = () => {
    const { apiCalls, myTeam } = useSelector(state => state.apiData)
    const dispatch = useDispatch()

    const [email, setEmail] = useState(null);

    // get api
    useEffect(() => {
        dispatch(get_api_status())
    }, [dispatch])

    // get the email
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setEmail(user.email)
            }
        });
    }, [])

    const handleLogOut = () => {
        dispatch(log_out());
    }
    const handleSaveChanges = () => {
        //TODO FIX THIS :(
        const res = save_changes();
        if (res === true) {
            toast.success(<Notification message="Changes Saved" />,
                { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
        }
    }



    return (
        <>
            <div className="d-flex flex-column my-0 mx-auto p-2 settings ">
                <div className="d-flex align-items-center justify-content-around settings__header">
                    <h4>System & Settings </h4>
                    <p className="account">
                        {email}
                    </p>
                </div>
                <img src={myTeam.logo} alt={myTeam.name} className="d-block align-self-center" />
                <div className="d-flex flex-column justify-content-around font-weight-bold settings__body ">
                    <Search title="Change Team" />

                    <span>API Requests {apiCalls ? apiCalls : 'Loading...'}</span>

                    <div className="settings__body-buttons">

                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <button onClick={handleLogOut} className="logout">Log Out</button>
                    </div>

                </div>


            </div>
            <Navbar />
        </>
    );
};
// const mapStateToProps = state => ({
//     myTeamId: state.team.myTeamId,
//     apiCalls: state.team.apiCalls
// })
// export default connect(mapStateToProps, { log_out, get_api_status, save_changes })(Settings);
export default Settings;