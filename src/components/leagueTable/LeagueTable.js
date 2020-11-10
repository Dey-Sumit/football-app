import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './leagueTable.scss'
import { useDispatch, useSelector } from 'react-redux'
import { get_domestic_league_table } from '../../redux/actions/team.action'
import SkeletonCard from '../skeletons/SkeletonCard';


const LeagueTable = () => {

    const domesticLeagueTable = useSelector(state => state.apiData.domesticLeagueTable)
    const leagueId = useSelector(state => state.apiData.leagueId)

    const dispatch = useDispatch()

    useEffect(() => {
        if (leagueId)
            dispatch(get_domestic_league_table(leagueId))
    }, [leagueId, dispatch])



    return (
        <div className="league_table">
            <h4>League Table </h4>
            { domesticLeagueTable ?
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

                            domesticLeagueTable.map(team =>
                                <tr key={team.teamId}>
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
                : <SkeletonCard width='100%' height={30} count={20} />
            }
        </div>
    );
};
export default LeagueTable;