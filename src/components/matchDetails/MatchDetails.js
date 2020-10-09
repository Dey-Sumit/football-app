import React, { useEffect } from 'react';

import Stats from '../stats/Stats';
import './matchDetails.scss'
import { connect } from 'react-redux'
import { get_fixture_details } from '../../redux/actions/team.action'
import SkeletonCard from '../skeletons/SkeletonCard';
import FixtureMetaData from '../fixtureMetaData/FixtureMetaData';


const MatchDetails = ({ fixture_id, fixture_details, get_fixture_details }) => {
    useEffect(() => {
        console.log(fixture_id);
        if (fixture_id)
            get_fixture_details(fixture_id)
    }, [fixture_id, get_fixture_details])


    return (
        fixture_details ?
            <div className="matchDetails">
                <FixtureMetaData fixture_details={fixture_details} />
                {fixture_details?.statistics &&
                    <Stats stats={fixture_details.statistics} />
                }
            </div>
            : <SkeletonCard width={`100%`} height={600} />
    );
};
const mapStateToProps = state => ({
    fixture_id: state.team.current_or_last_fixture_id,
    fixture_details: state.team.fixture_details
})
export default connect(mapStateToProps, { get_fixture_details })(MatchDetails);