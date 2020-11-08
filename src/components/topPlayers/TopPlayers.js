import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { get_top_players } from '../../redux/actions/team.action'
import PlayerCard from '../playerCard/PlayerCard'
import SkeletonCard from '../skeletons/SkeletonCard'
import './topPlayers.scss'
const TopPlayers = ({ league_id, get_top_players, topPlayers }) => {
    league_id = 2790
    useEffect(() => {
        if (league_id)
            get_top_players(league_id);
    }, [league_id, get_top_players])

    return (
        <div className="topPlayers">
            <h4>Top Players of League</h4>
            <div className="topPlayers__container">
                {
                    topPlayers ?
                        topPlayers.map(player =>
                            <PlayerCard player={player} key={player.player_id} />)
                        : <SkeletonCard count={9} width={160} height={200} />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    topPlayers: state.team.topPlayers

})

// const mapDispatchToProps = {
//     get_top_players
// }

export default connect(mapStateToProps, { get_top_players })(TopPlayers)
