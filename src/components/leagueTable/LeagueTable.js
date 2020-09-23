import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { api } from '../../axios/axios';
import './leagueTable.scss'
const LeagueTable = () => {
    const [leagueTable, setLeagueTable] = useState([])
    useEffect(() => {
        const callback = (data) => {
            setLeagueTable(data.standings[0])
            console.table(data.standings[0]);
        }
        api('/leagueTable/2833', callback)
    }, [])

    return (
        <div>
            {
                <Table striped bordered variant="dark" size="sm" className="table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>MP</th>
                            <th>Win</th>
                            <th>Lose</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {
                            [...Array(17)].splice(5, 10).map((_, i) =>
                                <tr>
                                    <th>{i}</th>
                                    <th> <img src="https://media.api-sports.io/football/teams/541.png" alt="team name" className="mr-2" />Atletico Madrid </th>
                                    <th>{Math.floor(Math.random() * 18)}</th>
                                    <th>{Math.floor(Math.random() * 14)}</th>
                                    <th>{Math.floor(Math.random() * 8)}</th>
                                    <th>{Math.floor(Math.random() * 8)}</th>
                                </tr>
                            )
                        } */}
                        {
                            leagueTable.splice(6, 10).map(team =>
                                <tr >
                                    <td>{team.rank}</td>
                                    <td>{team.teamName}<img src={team.logo} alt="team" className="ml-2" />  </td>
                                    <td>{team.all.matchsPlayed}</td>
                                    <td>{team.all.win}</td>
                                    <td>{team.all.lose} </td>
                                    <td>{team.points}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            }
        </div>
    );
};

export default LeagueTable;