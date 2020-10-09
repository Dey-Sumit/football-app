import React from 'react';
import './lineUp.scss'
const LineUp = ({ lineup: { coach, formation, startXI, substitutes } }) => {

    return (
        <div className="lineup">

            <span className="lineup__header">Manger : {coach} {' '}{' '}{' '} Formation : {formation}</span>
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