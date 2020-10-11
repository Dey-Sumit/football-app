import React from 'react';
import './playerCard.scss'
const PlayerCard = ({ player: { player_id, player_name, team_id, goals } }) => {
    return (
        <div className="playerCard" style={{ 'backgroundImage': `url('https://media.api-sports.io/football/teams/${team_id}.png')` }}>
            <div className="playerCard__image">
                <img src={`https://media.api-sports.io/football/players/${player_id}.png`} alt="" />
            </div>
            <div className="playerCard__data">
                <div className="playerCard__data-top">
                    <span>{player_name}</span>


                </div>
                <div className="playerCard__data-bottom">
                    <span>Goals : {goals.total}</span>
                    <span>Assists : {goals.assists ? goals.assists : 0}</span>

                </div>
            </div>
        </div>
    );
};

export default PlayerCard;