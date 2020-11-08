import React from 'react';
import { useHistory } from 'react-router-dom';

import './Fixture.scss'

const Fixture = ({ fixture: { fixture_id, league, homeTeam, awayTeam, event_date, score }, last }) => {

    const history = useHistory();

    const handleClick = () => history.push(`/fixtures/${fixture_id}`)

    return (
        <div key={fixture_id} className={last ? 'fixture fixture-last' : 'fixture'} onClick={handleClick}>
            <img src={league.logo} alt={league.name} className="fixture__logo" />
            <div className="fixture__teams">
                <img src={homeTeam.logo} alt="home" className="fixture__logo" />
                            vs
                <img src={awayTeam.logo} alt="away" className="fixture__logo" />
            </div>
            <div>
                <p>{new Date(event_date).toDateString()}</p>
                <p>{score?.fulltime ? `score : ${score.fulltime}` : 'upcoming'}</p>
            </div>
        </div >
    );
};

export default Fixture;