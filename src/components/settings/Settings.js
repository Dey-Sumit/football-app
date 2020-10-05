import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../axios/axios';
import { types } from '../../context/reducer';
import { useGlobalState } from '../../context/StateProvider';
import { auth, db } from '../../firebase/firebase';
import Notification from '../notification/Notification';
import Search from '../search/Search';
import firebase from 'firebase'
import './settings.scss'
// account
// log out
// api status
// change team
// change timezone
// remove data


const Settings = () => {
    const history = useHistory()
    const [{ user, myTeam }, dispatch] = useGlobalState()
    const [email, setEmail] = useState(null);
    const handleLogOut = () => {
        auth.signOut()
        dispatch({
            type: types.LOG_OUT
        })
        history.push('/auth')
    }
    const [apiRequests, setApiRequests] = useState(null);

    useEffect(() => {

        // var user = firebase.auth().currentUser;

        // if (user) {
        //     console.log(user);
        // } else {
        //     console.log("NO");
        // }
        const callback = (data) => {
            setApiRequests(data.status.requests)
        }
        api('/status', callback)
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setEmail(user.email)
            } else {
                // No user is signed in.
            }
        });



    }, [])

    const saveChanges = () => {
        //TODO change this to a function
        db
            .collection('teams')
            .doc(user)
            .set(
                {
                    team_id: myTeam.team_id,
                    logo: myTeam.logo,
                    name: myTeam.name
                }
            )
            .then(() => {
                dispatch({
                    type: types.ADD_TO_MY_TEAM,
                    payload: myTeam
                })
                history.push('/')
            })
            .catch(
                error => {
                    console.error(error)
                    toast.error(<Notification message={error.message} />,
                        { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })


                }
            )
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

export default Settings;