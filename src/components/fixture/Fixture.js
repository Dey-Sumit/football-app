import React from 'react';
import { useHistory } from 'react-router-dom';
import './Fixture.scss'

const Fixture = ({ fixture: { fixture_id, league, homeTeam, awayTeam, event_date }, last, next }) => {

    var fixture_class = "fixture";
    if (last)
        fixture_class = `${fixture_class} fixture-last`
    else
        fixture_class = `${fixture_class} fixture-next`

    const history = useHistory();

    return (
        <div key={fixture_id} className={fixture_class} onClick={() => {
            console.log("cel");
            history.push(`/fixtures/${fixture_id}`)
        }}>

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