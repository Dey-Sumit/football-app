import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import { db } from '../../firebase/firebase';

import Search from '../search/Search';
import firebase from 'firebase'
import './settings.scss'
import { connect } from 'react-redux'
import { log_out } from '../../redux/actions/auth.action'
import { get_api_status } from '../../redux/actions/team.action'

const Settings = ({ log_out, my_team_id, get_api_status, api_calls }) => {
    const history = useHistory()
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

    const handleLogOut = async () => {
        await log_out();
        history.push('/auth')
    }


    const saveChanges = () => {
        //TODO change this to a function
        // db
        //     .collection('teams')
        //     .doc(user)
        //     .set(
        //         {
        //             team_id: myTeam.team_id,
        //             logo: myTeam.logo,
        //             name: myTeam.name
        //         }
        //     )
        //     .then(() => {
        //         dispatch({
        //             type: types.ADD_TO_MY_TEAM,
        //             payload: myTeam
        //         })
        //         history.push('/')
        //     })
        //     .catch(
        //         error => {
        //             console.error(error)
        //             toast.error(<Notification message={error.message} />,
        //                 { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })


        //         }
        //     )
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
                    {/* TODO only active if there is any change */}
                    <button onClick={saveChanges}>Save Changes</button>
                    <button>Delete User</button>
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
export default connect(mapStateToProps, { log_out, get_api_status })(Settings);