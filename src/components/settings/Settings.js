import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Notification from '../notification/Notification'

import Search from '../search/Search';
import firebase from 'firebase'
import './settings.scss'
import { connect } from 'react-redux'
import { log_out, save_changes } from '../../redux/actions/auth.action'
import { get_api_status } from '../../redux/actions/team.action'

const Settings = ({ log_out, my_team_id, get_api_status, api_calls, save_changes }) => {

    const [email, setEmail] = useState(null);

    useEffect(() => {
        get_api_status()
    }, [get_api_status])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setEmail(user.email)
            }
        });
    }, [])

    const handleLogOut = () => {
        log_out();
    }
    const handleSaveChanges = async () => {
        const res = await save_changes();
        if (res === true) {
            toast.success(<Notification message="Changes Saved" />,
                { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
        }
    }


    return (
        <div className="settings">
            <div className="settings__header">
                <h4>System & Settings </h4>
                <p className="account">
                    {email}
                </p>
            </div>
            <img src={`https://media.api-sports.io/football/teams/${my_team_id}.png`} alt="" />
            <div className="settings__body">
                <Search title="Change Team" />
                <div className="settings__body-option">
                    API Requests <span>{api_calls ? api_calls : 'Loading'}</span>
                </div>
                <div className="settings__body-buttons">

                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleLogOut} className="logout">Log Out</button>
                </div>

            </div>


        </div>
    );
};
const mapStateToProps = state => ({
    my_team_id: state.team.my_team_id,
    api_calls: state.team.api_calls
})
export default connect(mapStateToProps, { log_out, get_api_status, save_changes })(Settings);