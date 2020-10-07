import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../axios/axios';
import { db } from '../../firebase/firebase';
import Notification from '../notification/Notification';
import Search from '../search/Search';
import firebase from 'firebase'
import './settings.scss'
import { connect } from 'react-redux'
import { log_out } from '../../redux/actions/auth.action'

const Settings = ({ log_out }) => {

    const history = useHistory()
    const [email, setEmail] = useState(null);
    const [apiRequests, setApiRequests] = useState(null);

    //TODO protect this route
    const handleLogOut = () => {
        log_out();
        history.push('/auth')
    }

    useEffect(() => {
        const callback = (data) => {
            setApiRequests(data.status.requests)
        }
        toast.error(<Notification message="Design Me" />,
            { position: toast.POSITION.TOP_RIGHT, autoClose: false })


        api('/status', callback)


    }, [])
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setEmail(user.email)
            }
        });
    }, [])
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
            {/* <img src={myTeam.logo} alt="" /> */}
            <div className="settings__body">
                <Search title="Change Team" />
                <div className="settings__body-option">
                    API Requests <span>{apiRequests ? apiRequests : 'Loading'}</span>
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

export default connect(null, { log_out })(Settings);