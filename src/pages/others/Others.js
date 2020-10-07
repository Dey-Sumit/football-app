import React from 'react';
import './others.scss'
import { useEffect } from 'react';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import LeagueTable from '../../components/leagueTable/LeagueTable'

const PlayerCard = ({ player: { player_id, player_name, position, team_name, games, goals, shots } }) => {
    return (
        <div className="playerCard">
            <div className="playerCard__image">
                <img src={`https://media.api-sports.io/football/players/${player_id}.png`} alt="" />
            </div>
            <div className="playerCard__data">
                <div className="playerCard__data-top">
                    <span>{player_name} -{' '} ({team_name})</span>


                </div>
                <div className="playerCard__data-bottom">
                    <span>Goals : {goals.total}</span>
                    <span>Assists : {shots.assists}</span>

                </div>
            </div>
        </div>
    );
};

// champions league


const Others = () => {

    // const [topPlayers, setTopPlayers] = useState([])
    // useEffect(() => {
    //     const callback = (data) => {
    //         console.log(data);
    //         setTopPlayers(data.topscorers.slice(0, 7));
    //     }
    //     api(`topscorers/${2790}`, callback)
    // }, [])

    return (
        // <div className="topPlayers">
        //     {topPlayers.length > 0 &&
        //         topPlayers.map(player => <PlayerCard player={player} key={player.player_id} />)
        //     }
        // </div>

        <Col md={3} lg={4}>

            <LeagueTable />

        </Col>

    );
};
{/*  */ }
export default Others;