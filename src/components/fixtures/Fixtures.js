import React from 'react';
import { useSelector } from 'react-redux'

import Fixture from '../fixture/Fixture';
import SkeletonCard from '../skeletons/SkeletonCard';

// no css
import './fixtures.scss'

const Fixtures = () => {
    const { lastFixtures, nextFixtures } = useSelector(state => state.apiData.lastAndNextFixtures)
    return (
        <>
            {
                lastFixtures ? [...lastFixtures].reverse().map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} last />
                ) : <SkeletonCard width={`100%`} height={75} count={3} />
            }
            {
                nextFixtures ? nextFixtures.map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} next />)
                    : <SkeletonCard width={`100%`} height={75} count={5} />

            }
        </>
    );
};

export default Fixtures;