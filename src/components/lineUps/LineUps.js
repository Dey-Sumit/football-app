import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import LineUp from '../lineup/LineUp';
import SkeletonCard from '../skeletons/SkeletonCard';
import './lineUps.scss'

const LineUps = () => {

    const [currentLineUp, setCurrentLineUp] = useState('home')

    const lineups = useSelector(state => state.apiData.fixtureDetails?.lineups)
    const homeTeam = useSelector(state => state.apiData.fixtureDetails?.homeTeam)
    const awayTeam = useSelector(state => state.apiData.fixtureDetails?.awayTeam)

    // optional chaining pro :)
    const home_lineup = lineups?.[homeTeam?.team_name]
    const away_lineup = lineups?.[awayTeam?.team_name]

    return (
        lineups ?
            <div className="lineups">
                <div className="lineups__navbar" >

                    <img
                        src={homeTeam?.logo}
                        onClick={() => setCurrentLineUp('home')}
                        alt={awayTeam?.team_name} />
                    <img
                        src={awayTeam?.logo}
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
// const mapStateToProps = state => ({
//     lineups: state.team.fixtureDetails?.lineups,
//     homeTeam: state.team.fixtureDetails?.homeTeam,
//     awayTeam: state.team.fixtureDetails?.awayTeam,
// })

// export default connect(mapStateToProps)(LineUps);
export default LineUps;