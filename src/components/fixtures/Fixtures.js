import React from 'react';
import Fixture from '../fixture/Fixture';
import './fixtures.scss'
const Fixtures = ({ lastFixtures, nextFixtures }) => {
    return (
        <div>
            {
                lastFixtures.map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} last />
                )
            }
            {
                nextFixtures.map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} next />
                )
            }
        </div >
    );
};

export default Fixtures;