import React from 'react';
import './fixtureMetaData.scss';
const FixtureMetaData = ({ fixture_details: { league, venue, event_date, homeTeam, goalsHomeTeam, awayTeam, goalsAwayTeam } }) => {
    return (
        <div className="metaData">
            <div className="metaData__time">
                <img src={league?.logo} alt="" />
                <p>{venue}</p>
                <p>{new Date(event_date).toDateString()}</p>
            </div>

            <div className="metaData__body">
                <img src={homeTeam?.logo} alt="" className="team__logo-small" />
                <div className="metaData__score">
                    {goalsHomeTeam} -  {goalsAwayTeam}
                </div>
                <img src={awayTeam?.logo} alt="" className="team__logo-small" />
            </div>
        </div>
    )
}

export default FixtureMetaData;