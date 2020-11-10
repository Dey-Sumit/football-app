import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_top_players } from '../../redux/actions/team.action'
import PlayerCard from '../playerCard/PlayerCard'
import SkeletonCard from '../skeletons/SkeletonCard'
import './topPlayers.scss'
const TopPlayers = () => {

    const leagueId = useSelector(state => state.apiData.leagueId)
    const topPlayers = useSelector(state => state.apiData.topPlayers)
    const dispatch = useDispatch()

    // league_id = 2790
    useEffect(() => {
        if (leagueId)
            dispatch(get_top_players(leagueId));
    }, [leagueId, dispatch])

    return (
        <div className="topPlayers">
            <h4>Top Players of League</h4>
            <div className="topPlayers__container">
                {
                    topPlayers ?
                        topPlayers.map(player =>
                            <PlayerCard player={player} key={player.player_id} />)
                        : <SkeletonCard count={9} width={160} height={200} style={{ 'margin': '0.3rem' }} />
                }
            </div>
        </div>
    )
}

// const mapDispatchToProps = {
//     get_top_players
// }

export default TopPlayers
