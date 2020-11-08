import React, { useState } from 'react';
import LineUp from '../lineup/LineUp';
import { connect } from 'react-redux';
import './lineUps.scss'
import SkeletonCard from '../skeletons/SkeletonCard';

const LineUps = ({ lineups, homeTeam, awayTeam }) => {

    const [currentLineUp, setCurrentLineUp] = useState('home')

    // optional chaining pro :)
    const home_lineup = lineups?.[homeTeam?.team_name]
    const away_lineup = lineups?.[awayTeam?.team_name]
    return (
        lineups ?
            <div className="lineups">
                <div className="lineups__navbar" >

                    <img
                        src={`https://media.api-sports.io/football/teams/${homeTeam?.teamId}.png`}
                        onClick={() => setCurrentLineUp('home')}
                        alt={awayTeam?.team_name} />
                    <img
                        src={`https://media.api-sports.io/football/teams/${awayTeam?.teamId}.png`}
                        onClick={() => setCurrentLineUp('away')}
                        alt={awayTeam?.team_name} />
                </div>

                {
                    currentLineUp === 'home' ?
                        <LineUp lineup={home_lineup} team_name={homeTeam?.team_name} />
                        : <LineUp lineup={away_lineup} team_name={awayTeam?.team_name} />
                }

            </div>
            : <SkeletonCard width='100%' count={11} />
    );
};
const mapStateToProps = state => ({
    lineups: state.team.fixtureDetails?.lineups,
    homeTeam: state.team.fixtureDetails?.homeTeam,
    awayTeam: state.team.fixtureDetails?.awayTeam,
})

export default connect(mapStateToProps)(LineUps);