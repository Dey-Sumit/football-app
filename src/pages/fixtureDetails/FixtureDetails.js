import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeadToHead from '../../components/headtoHead/Head2Head';

import LineUps from '../../components/lineUps/LineUps';
import Prediction from '../../components/prediction/Prediction';
import Stats from '../../components/stats/Stats';
import './fixtureDetails.scss'

import { connect } from 'react-redux'
import { get_fixture_details } from '../../redux/actions/team.action'

const FixtureDetails = ({ get_fixture_details, fixture_details }) => {

    const { fixture_id } = useParams()
    const [activeComponent, setActiveComponent] = useState('prediction')

    useEffect(() => {
        get_fixture_details(fixture_id);
    }, [fixture_id, get_fixture_details])

    return (
        <div className="fixture_details col-md-8">
            {/* //TODO make it a component */}
            <div className="fixture_details__time">
                <img src={fixture_details?.league?.logo} alt="" />
                <p>{fixture_details?.venue}</p>
                <p>{new Date(fixture_details.event_date).toDateString()}</p>
            </div>
            <div className="fixture_details__top">
                <img src={fixture_details.homeTeam?.logo} alt="" className="team__logo-small" />
                <div className="fixture_details__score">
                    {fixture_details.goalsHomeTeam} - {fixture_details.goalsAwayTeam}
                </div>
                <img src={fixture_details.awayTeam?.logo} alt="" className="team__logo-small" />
            </div>

            {/* nested navbar */}
            <div className="fixture__navbar">
                <div className="fixture__nav" onClick={() => setActiveComponent('h2h')}>h2h</div>
                <div className="fixture__nav" onClick={() => setActiveComponent('stats')}>Stats</div>
                <div className="fixture__nav" onClick={() => setActiveComponent('prediction')}>Prediction</div>
                <div className="fixture__nav" onClick={() => setActiveComponent('lineups')}>Lineups</div>
            </div>

            {activeComponent === 'h2h' && <HeadToHead />}
            { activeComponent === 'prediction' && <Prediction />}
            {/* //TOOD modify Stats component drilling in match details */}
            {   activeComponent === 'stats' && <Stats />}
            {activeComponent === 'lineups' && <LineUps />}

        </div >
    );
};
const mapStateToProps = state => ({
    fixture_details: state.team.fixture_details
})

export default connect(mapStateToProps, { get_fixture_details })(FixtureDetails);