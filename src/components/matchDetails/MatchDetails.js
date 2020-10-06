import React, { useEffect, useState } from 'react';

import Stats from '../stats/Stats';
// import Team from '../team/Team'
import './matchDetails.scss'
import { connect } from 'react-redux'
import { get_fixture_details } from '../../redux/actions/team.action'
import Skeleton from 'react-loading-skeleton';


const MatchDetails = ({ fixture_id, fixture_details, get_fixture_details }) => {
    useEffect(() => {
        console.log("use effect match details");
        get_fixture_details(fixture_id)
    }, [fixture_id, get_fixture_details])
    console.log(fixture_details?.statistics);

    return (
        fixture_details ?
            <div className="matchDetails">
                <div className="matchDetails__time">
                    <img src={fixture_details?.league?.logo} alt="" />
                    <p>{fixture_details?.venue}</p>
                    <p>{new Date(fixture_details.event_date).toDateString()}</p>
                </div>
                <div className="matchDetails__top">

                    <img src={fixture_details.homeTeam.logo} alt="" className="team__logo-small" />
                    <div className="matchDetails__score">
                        {fixture_details.goalsHomeTeam} - {fixture_details.goalsAwayTeam}
                    </div>
                    <img src={fixture_details.awayTeam.logo} alt="" className="team__logo-small" />

                </div>
                {fixture_details?.statistics &&
                    <Stats stats={fixture_details.statistics} />
                }
            </div>
            : <Skeleton width={`100%`} height={600} />
    );
};
const mapStateToProps = state => ({
    fixture_id: state.team.current_or_next_fixture_id,
    fixture_details: state.team.fixture_details
})
export default connect(mapStateToProps, { get_fixture_details })(MatchDetails);