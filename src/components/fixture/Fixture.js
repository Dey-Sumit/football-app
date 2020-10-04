import React from 'react';
import { useHistory } from 'react-router-dom';
import './Fixture.scss'

const Fixture = ({ fixture: { fixture_id, league, homeTeam, awayTeam, event_date }, last }) => {

    var fixture_class = "fixture";
    if (last)
        fixture_class = `${fixture_class} fixture-last`

    const history = useHistory();
    const handleClick = () => history.push(`/fixtures/${fixture_id}`)
    return (
        <div key={fixture_id} className={fixture_class} onClick={handleClick}>
            <img src={league.logo} alt={league.name} className="team__logo-small" />
            <div className="fixture__teams">
                <img src={homeTeam.logo} alt="home" className="team__logo-small" />
                            vs
                <img src={awayTeam.logo} alt="away" className="team__logo-small" />
            </div>

            <p>{new Date(event_date).toDateString()}</p>
        </div >
    );
};

export default Fixture;