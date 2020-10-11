import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadToHead from '../../components/headtoHead/Head2Head';

import LineUps from '../../components/lineUps/LineUps';
import Prediction from '../../components/prediction/Prediction';
import Stats from '../../components/stats/Stats';
import './fixtureDetails.scss'

import { connect } from 'react-redux'
import { get_fixture_details } from '../../redux/actions/team.action'
import FixtureMetaData from '../../components/fixtureMetaData/FixtureMetaData';
import SkeletonCard from '../../components/skeletons/SkeletonCard';
// 605107

const FixtureDetails = ({ get_fixture_details, fixture_details }) => {
    console.log("fixture details");
    const { fixture_id } = useParams()
    const [activeComponent, setActiveComponent] = useState('lineups')

    useEffect(() => {
        get_fixture_details(fixture_id);
    }, [fixture_id, get_fixture_details])

    return (
        <div className="fixtureDetails col-md-8">
            {fixture_details ?
                <FixtureMetaData fixture_details={fixture_details} />
                : <SkeletonCard width='100%' height={180} />}

            {/* nested navbar */}
            <div className="fixtureDetails__navbar">
                <div className={activeComponent === 'h2h' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('h2h')}>h2h</div>
                {
                    (fixture_details?.statusShort === 'NS' || fixture_details?.statusShort === 'TBD') ?
                        <div className={activeComponent === 'prediction' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('prediction')}>Prediction</div> :

                        <>  <div className={activeComponent === 'stats' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('stats')}>Stats</div>
                            <div className={activeComponent === 'lineups' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('lineups')}>Lineups</div>
                        </>
                }

            </div>

            {activeComponent === 'h2h' && <HeadToHead
                homeTeamId={fixture_details?.homeTeam?.team_id}
                awayTeamId={fixture_details?.awayTeam?.team_id} />}
            { activeComponent === 'prediction' && <Prediction fixture_id={fixture_id} />}

            {   activeComponent === 'stats' && <Stats />}
            {activeComponent === 'lineups' && <LineUps />}

        </div >
    );
};
const mapStateToProps = state => ({
    fixture_details: state.team.fixture_details
})

export default connect(mapStateToProps, { get_fixture_details })(FixtureDetails);