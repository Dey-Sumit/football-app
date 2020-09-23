import React from 'react';
import { Row } from 'react-bootstrap';
import Team from '../team/Team';


const TeamsRow = ({ country, teams }) => {
    return (
        <div className="teams-row">
            <h4 className="teams-row__title">
                {country}
            </h4>
            <Row className="teams-row__teams">
                {
                    teams.map(team =>
                        <Team key={team.name} team={team} noName />
                    )
                }
            </Row>
        </div>
    );
};

export default TeamsRow;