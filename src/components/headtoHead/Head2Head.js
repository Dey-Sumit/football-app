import React, { useEffect, useState } from 'react';
import { api } from '../../axios/axios';
import './headToHead.scss'


const H2HMatch = ({ data, match: { event_date, homeTeam, awayTeam, league, score } }) => {
    return (
        <div className="H2HMatch">
            <div className="H2HMatch__heading">
                <span>{league.name}</span>
                <span>{new Date(event_date).toDateString()}</span>
            </div>
            <div className="H2HMatch__body">
                <div className="H2HMatch__team">
                    <img src={homeTeam.logo} alt={homeTeam.team_name} />
                    <span>{homeTeam.team_name}</span>
                </div>
                {score.fulltime ? score.fulltime : 'upcoming'}
                <div className="H2HMatch__team H2HMatch__team-away">
                    <img src={awayTeam.logo} alt={awayTeam.team_name} />
                    <span>{awayTeam.team_name}</span>
                </div>
            </div>
        </div>
    )
}

const HeadToHead = ({ homeTeam, awayTeam }) => {

    const [headToHeadData, setHeadToHeadData] = useState()
    useEffect(() => {
        const callback = data =>
            setHeadToHeadData(data.fixtures)

        api(`fixtures/h2h/${homeTeam.team_id}/${awayTeam.team_id}`, callback)
    }, [homeTeam, awayTeam])

    return (
        <div className="headToHeadContainer">
            {
                headToHeadData &&
                headToHeadData.slice(Math.max(headToHeadData.length - 5, 1)).map(
                    match =>
                        <H2HMatch
                            key={match.fixture_id}
                            match={match}
                            data={match}
                        />
                )
            }

        </div>
    );
};

export default HeadToHead;