import React from 'react';
import Fixture from '../fixture/Fixture';
import './fixtures.scss'
import { connect } from 'react-redux'
import SkeletonCard from '../skeletons/SkeletonCard';

const Fixtures = ({ lastFixtures, nextFixtures }) => {
    console.log("FIXTURES");
    console.log(lastFixtures, nextFixtures);
    return (
        <div>
            {
                lastFixtures ? lastFixtures.reverse().map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} last />
                ) : <SkeletonCard width={`100%`} height={80} count={8} />
            }
            {
                nextFixtures && nextFixtures.map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} next />
                )
            }
        </div >
    );
};
const mapStateToProps = state => ({
    lastFixtures: state.team.last_and_next_fixtures.last_fixtures,
    nextFixtures: state.team.last_and_next_fixtures.next_fixtures,
    loading: state.team.loading
})
export default connect(mapStateToProps)(Fixtures);