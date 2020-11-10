import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Stats from '../stats/Stats';
import { get_fixture_details } from '../../redux/actions/team.action'
import SkeletonCard from '../skeletons/SkeletonCard';
import FixtureMetaData from '../fixtureMetaData/FixtureMetaData';

import './matchDetails.scss'

const MatchDetails = () => {

    const fixture_id = useSelector(state => state.apiData.currentOrLastFixtureId)
    const fixtureDetails = useSelector(state => state.apiData.fixtureDetails)

    const dispatch = useDispatch()

    useEffect(() => {
        if (fixture_id)
            dispatch(get_fixture_details(fixture_id))
    }, [fixture_id, dispatch])


    return (
        fixtureDetails ?
            <div className="matchDetails">
                <FixtureMetaData fixtureDetails={fixtureDetails} />
                {fixtureDetails?.statistics &&
                    <Stats stats={fixtureDetails.statistics} />
                }
            </div>
            : <SkeletonCard width={`100%`} height={600} />
    );
};

export default MatchDetails;