import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { api } from '../../axios/axios';
import './leagueTable.scss'
const LeagueTable = ({ leagueId }) => {
    // const [leagueTable, setLeagueTable] = useState([])
    // useEffect(() => {
    //     const callback = (data) => {
    //         console.log(data);
    //         setLeagueTable(data?.standings[0])
    //         // console.table(data?.standings[0]);
    //     }
    //     api(`/leagueTable/${leagueId}`, callback)
    // }, [leagueId])
    var arr = Array.from(Array(10).keys())
    console.log(arr);
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
                        {
                            arr.map(team =>
                                <tr key={team}>
                                    <td>{team}</td>
                                    <td>{team} </td>
                                    <td>{team}</td>
                                    <td>{team}</td>
                                    <td>{team} </td>
                                    <td>{team}</td>
                                </tr>)
                        }

                    </tbody>

                    {/* <tbody>
                        {
                            leagueTable &&
                            leagueTable.splice(0, 10).map(team =>
                                <tr key={team.team_id}>
                                    <td>{team.rank}</td>
                                    <td>{team.teamName}<img src={team.logo} alt="team" className="ml-2" />  </td>
                                    <td>{team.all.matchsPlayed}</td>
                                    <td>{team.all.win}</td>
                                    <td>{team.all.lose} </td>
                                    <td>{team.points}</td>
                                </tr>
                            )
                        }

                    </tbody> */}
                </Table>
            }
        </div>
    );
};

export default LeagueTable;