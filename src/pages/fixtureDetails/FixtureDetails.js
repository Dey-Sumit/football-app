import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadToHead from '../../components/headtoHead/Head2Head';

import LineUps from '../../components/lineUps/LineUps';
import Prediction from '../../components/prediction/Prediction';
import Stats from '../../components/stats/Stats';
import './fixtureDetails.scss'

import { useDispatch, useSelector } from 'react-redux'
import { get_fixture_details } from '../../redux/actions/team.action'
import FixtureMetaData from '../../components/fixtureMetaData/FixtureMetaData';
import SkeletonCard from '../../components/skeletons/SkeletonCard';
import Navbar from '../../components/navbar/Navbar';
// 605107

const FixtureDetails = () => {

    const { fixture_id } = useParams()
    const [activeComponent, setActiveComponent] = useState('h2h')

    const fixtureDetails = useSelector(state => state.apiData.fixtureDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_fixture_details(fixture_id));
    }, [fixture_id, dispatch])

    return (
        <>
            <div className="fixtureDetails col-md-8 mb-5">
                {fixtureDetails ?
                    <FixtureMetaData fixtureDetails={fixtureDetails} />
                    : <SkeletonCard width='100%' height={180} />}

                {/* nested navbar */}
                <div className="fixtureDetails__navbar">
                    <div className={activeComponent === 'h2h' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('h2h')}>h2h</div>
                    {
                        (fixtureDetails?.statusShort === 'NS' || fixtureDetails?.statusShort === 'TBD') ?
                            <div className={activeComponent === 'prediction' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('prediction')}>Prediction</div> :

                            <>  <div className={activeComponent === 'stats' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('stats')}>Stats</div>
                                <div className={activeComponent === 'lineups' ? 'fixtureDetails__nav active' : 'fixtureDetails__nav'} onClick={() => setActiveComponent('lineups')}>Lineups</div>
                            </>
                    }

                </div>

                {activeComponent === 'h2h' && <HeadToHead
                    homeTeamId={fixtureDetails?.homeTeam?.team_id}
                    awayTeamId={fixtureDetails?.awayTeam?.team_id} />}
                {activeComponent === 'prediction' && <Prediction fixture_id={fixture_id} />}

                {activeComponent === 'stats' && <Stats />}
                {activeComponent === 'lineups' && <LineUps />}

            </div >
            <Navbar />
        </>
    );
};
// const mapStateToProps = state => ({
//     fixtureDetails: state.team.fixtureDetails
// })

// export default connect(mapStateToProps, { get_fixture_details })(FixtureDetails);
export default FixtureDetails;