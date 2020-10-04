import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../axios/axios';
import { types } from '../../context/reducer';
import { useGlobalState } from '../../context/StateProvider';
import { auth, db } from '../../firebase/firebase';
import Notification from '../notification/Notification';
import Search from '../search/Search';
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
    const handleLogOut = () => {
        auth.signOut()
        dispatch({
            type: types.LOG_OUT
        })
        history.push('/auth')
    }
    const [apiActive, setApiActive] = useState("No");

    useEffect(() => {
        const callback = (data) => setApiActive(data.status.active)
        api('/status', callback)
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
                <h3>System & Settings </h3>
                <p className="account">
                    Sumax333@gmail.com
                </p>
            </div>
            <img src={myTeam.logo} alt="" className="team__logo-small" />
            <div className="settings__body">
                <Search title="Change Team" />
                <div className="settings__body-option">
                    API Status <span>{apiActive === 'Yes' ? 'Active' : 'Not Active'}</span>
                </div>
                <div className="settings__body-buttons">
                    {/* TODO only active if there is any change */}
                    <button onClick={saveChanges}>Save Changes</button>
                    <button>Delete User</button>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>

            </div>


        </div>
    );
};

export default Settings;