import React, { useEffect } from 'react';
import { get_head_to_head } from '../../redux/actions/team.action'
import { useDispatch, useSelector } from 'react-redux'

import './headToHead.scss'
import SkeletonCard from '../skeletons/SkeletonCard';


const H2HMatch = ({ match: { event_date, homeTeam, awayTeam, league, score } }) => {
    return (
        <div className="H2HMatch">
            <div className="H2HMatch__heading">
                <span>{league.name}</span>
                <span>{new Date(event_date).toDateString()}</span>
            </div>
            <div className="H2HMatch__body">
                <div className="H2HMatch__team">
                    <img src={homeTeam.logo} alt={homeTeam.team_name} />
                    <span>{homeTeam.team_name}</span>
                </div>
                <span className="H2HMatch__score">{score.fulltime ? score.fulltime : 'upcoming'}</span>
                <div className="H2HMatch__team H2HMatch__team-away">
                    <img src={awayTeam.logo} alt={awayTeam.team_name} />
                    <span>{awayTeam.team_name}</span>
                </div>
            </div>
        </div>
    )
}

const HeadToHead = ({ homeTeamId, awayTeamId }) => {


    const headToHead = useSelector(state => state.apiData.headToHead)
    const dispatch = useDispatch()
    //TODO this component is rendering two times
    useEffect(() => {

        dispatch(get_head_to_head(homeTeamId, awayTeamId))
    }, [homeTeamId, awayTeamId, dispatch])

    return (
        headToHead ?
            <div className="headToHeadContainer">
                {

                    headToHead.slice(Math.max(headToHead.length - 5, 1)).map(
                        match =>
                            <H2HMatch
                                key={match.fixture_id}
                                match={match}
                                data={match}
                            />
                    )

                }
            </div>
            : <SkeletonCard width='100%' height={60} count={5} />


    );
};
// const mapStateToProps = state => ({
//     headToHead: state.team.headToHead
// })
// export default connect(mapStateToProps, { get_head_to_head })(HeadToHead);
export default HeadToHead;