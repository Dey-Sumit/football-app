import React from 'react';
import './lineUp.scss'
const LineUp = ({ lineup: { coach, formation, startXI, substitutes }, team_name }) => {

    return (
        <div className="lineup">

            <div className="lineup__header">
                <span>{team_name}</span>{" "}  <span>Manager : {coach}</span>{" "} <span> Formation : {formation}</span></div>
            <div className="lineup__wrapper">
                <div className="starts">
                    {
                        startXI.map(({ number, player, player_id }) =>
                            <p key={player_id}>
                                {number}{' '}{player}
                            </p>)
                    }
                </div>
                <div className="subs">
                    {
                        substitutes.map(({ number, player, player_id }) =>
                            <p key={player_id}>
                                {number}{' '}{player}
                            </p>)
                    }

                </div>

            </div>
        </div>
    );
};

export default LineUp;