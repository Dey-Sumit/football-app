import React, { useEffect, useState } from 'react';
import { api } from '../../axios/axios';
import Stats from '../stats/Stats';
// import Team from '../team/Team'
import './matchDetails.scss'




const MatchDetails = () => {
    // fixture_id: 292865
    //lineup,events,stats
    const [details, setDetails] = useState('');
    useEffect(() => {
        const callback = data =>
            setDetails(data.fixtures[0])

        api('fixtures/id/292865', callback)
    }, [])
    console.log(details?.statistics);

    return (
        <div className="matchDetails">
            <div className="matchDetails__time">
                <img src={details?.league?.logo} alt="" />
                <p>{details?.venue}</p>
                <p>{new Date(details.event_date).toDateString()}</p>
            </div>
            <div className="matchDetails__top">

                <img src={details.homeTeam?.logo} alt="" className="team__logo-small" />
                <div className="matchDetails__score">
                    {details.goalsHomeTeam} - {details.goalsAwayTeam}
                </div>
                <img src={details.awayTeam?.logo} alt="" className="team__logo-small" />

            </div>
            {details && details?.statistics &&
                <Stats stats={details.statistics} />
            }
        </div>
    );
};

export default MatchDetails;