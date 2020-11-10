import React, { useEffect } from 'react';

import Search from '../search/Search';
import './settings.scss'
import { useDispatch, useSelector } from 'react-redux'
import { log_out, update_profile } from '../../redux/actions/auth.action'
import { get_api_status } from '../../redux/actions/team.action'
import Navbar from '../navbar/Navbar';

const Settings = () => {
    const apiCalls = useSelector(state => state.apiData.apiCalls)
    const myTeam = useSelector(state => state.apiData.myTeam)
    const profile = useSelector(state => state.auth.profile)

    const dispatch = useDispatch()


    // get api
    useEffect(() => {
        dispatch(get_api_status())
    }, [dispatch])



    const handleLogOut = () => {
        dispatch(log_out());
    }
    const handleSaveChanges = () => {
        dispatch(update_profile())
    }



    return (
        <>
            <div className="d-flex flex-column my-0 mx-auto p-2 settings ">
                <div className="d-flex align-items-center justify-content-around settings__header">
                    <h4>System & Settings </h4>
                    <p className="account">
                        {profile.email}
                    </p>
                </div>
                <img src={myTeam?.logo} alt={myTeam?.name} className="d-block align-self-center" />
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