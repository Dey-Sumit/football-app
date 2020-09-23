import React from 'react';
import './settings.scss'
// account
// log out
// api status
// change team
// change timezone
// remove data


const Settings = () => {
    return (
        <div className="settings">
            <div className="settings__header">
                <h1>System & Settings </h1>
                <div className="account">
                    Sumax333@gmail.com
                </div>
            </div>
            <div className="settings__body">
                <div className="settings__body-option">
                    Change Team
                </div>
                <div className="settings__body-option">
                    Change Timezone
                </div>
                <div className="settings__body-option">
                    API Status
                </div>
                <div className="settings__body-option">
                    Remove Data
                </div>
                <div className="settings__body-option">
                    Log  out
                </div>

            </div>


        </div>
    );
};

export default Settings;