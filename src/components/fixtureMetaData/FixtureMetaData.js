import React from 'react';

import './fixtureMetaData.scss';

const FixtureMetaData = ({ fixtureDetails: { league, venue, event_date, homeTeam, goalsHomeTeam, awayTeam, goalsAwayTeam } }) => {

    return (
        <div className="p-2 metaData">
            <div className="d-flex justify-content-between align-items-center mb-2 metaData__header">
                <img src={league?.logo} alt="" />
                <p>{venue}</p>
                <p>{new Date(event_date).toDateString()}</p>
            </div>

            <div className="d-flex justify-content-between align-items-center metaData__body">
                <img src={homeTeam?.logo} alt="" />
                <div className="my-0 mx-2">
                    {goalsHomeTeam} -  {goalsAwayTeam}
                </div>
                <img src={awayTeam?.logo} alt="" />
            </div>
        </div>
    )
}

export default FixtureMetaData;