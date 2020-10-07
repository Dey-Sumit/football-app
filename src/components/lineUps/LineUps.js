import React, { useState } from 'react';
import LineUp from '../lineup/LineUp';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import './lineUps.scss'

const LineUps = ({ lineups, homeTeam, awayTeam }) => {

    const [currentLineUp, setCurrentLineUp] = useState('home')
    // const homeTeam = lineups[0]?.
    console.log(lineups);
    const home_lineup = lineups[homeTeam?.team_name]
    const away_lineup = lineups[awayTeam?.team_name]
    console.log(home_lineup, away_lineup);
    return (
        lineups ?
            <div className="lineups">
                <div className="lineups__navbar" >

                    <img
                        src={`https://media.api-sports.io/football/teams/${homeTeam?.team_id}.png`}
                        onClick={() => setCurrentLineUp('home')}
                        alt={awayTeam?.team_name} />
                    <img
                        src={`https://media.api-sports.io/football/teams/${awayTeam?.team_id}.png`}
                        onClick={() => setCurrentLineUp('away')}
                        alt={awayTeam?.team_name} />
                </div>

                {
                    currentLineUp === 'home' ?
                        <LineUp lineup={home_lineup} />
                        : <LineUp lineup={away_lineup} />
                }

            </div>
            : <Skeleton />
    );
};
const mapStateToProps = state => ({
    lineups: state.team.fixture_details?.lineups,
    homeTeam: state.team.fixture_details?.homeTeam,
    awayTeam: state.team.fixture_details?.awayTeam,
})

export default connect(mapStateToProps)(LineUps);