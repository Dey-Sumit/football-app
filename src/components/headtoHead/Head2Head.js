import React, { useEffect, useState } from 'react';
import { api } from '../../axios/axios';
import './headToHead.scss'


const H2HMatch = ({ date, home_team, away_team, league_name, score }) => {
    return (
        <div className="H2HMatch">
            <div className="H2HMatch__heading">
                <span>{league_name}</span>
                <span>{new Date(date).toDateString()}</span>
            </div>
            <div className="H2HMatch__body">
                <div className="H2HMatch__team">
                    <img src={home_team.logo} alt={home_team.team_name} />
                    <span>{home_team.team_name}</span>
                </div>
                {score ? score : 'upcoming'}
                <div className="H2HMatch__team H2HMatch__team-away">
                    <img src={away_team.logo} alt={away_team.team_name} />
                    <span>{away_team.team_name}</span>
                </div>
            </div>
        </div>
    )
}

const HeadToHead = ({ homeTeam, awayTeam }) => {

    const [headToHeadData, setHeadToHeadData] = useState()
    useEffect(() => {
        const callback = data => {
            console.log(data.fixtures);
            setHeadToHeadData(data.fixtures)
        }
        api(`fixtures/h2h/${homeTeam.team_id}/${awayTeam.team_id}`, callback)
    }, [])
    console.log(headToHeadData);
    return (
        <div className="headToHeadContainer">
            {
                headToHeadData &&
                headToHeadData.slice(Math.max(headToHeadData.length - 5, 1)).map(
                    match => <H2HMatch key={match.fixture_id} home_team={match.homeTeam} away_team={match.awayTeam} date={match.event_date} league_name={match.league.name} score={match.score.fulltime} />
                )
            }

        </div>
    );
};

export default HeadToHead;