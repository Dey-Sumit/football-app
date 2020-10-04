import React, { useState } from 'react';
import LineUp from '../lineup/LineUp';

const LineUps = ({ homeTeam, homeTeamLineup, awayTeam, awayTeamLineup }) => {

    const [currentLineUp, setCurrentLineUp] = useState('home')

    return (
        <div>
            <div className="lineUpsOption" >
                <div onClick={() => setCurrentLineUp('home')}>{homeTeam.team_name}</div>
                <div onClick={() => setCurrentLineUp('away')}>{awayTeam.team_name}</div>
            </div>
            {
                currentLineUp === 'home' ? <LineUp startXI={homeTeamLineup.startXI} />
                    : <LineUp startXI={awayTeamLineup.startXI} />
            }
        </div>
    );
};

export default LineUps;