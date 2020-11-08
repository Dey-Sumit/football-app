import React from 'react';
import { Row } from 'react-bootstrap';
import Team from '../team/Team';


const TeamsRow = ({ country, teams }) => {
    return (
        <div className="">
            <h4 className="my-3 text-center">
                {country}
            </h4>
            <Row className="justify-content-around">
                {
                    teams.map(team =>
                        <Team key={team.team_id} team={team} />
                    )
                }
            </Row>
        </div>
    );
};

export default TeamsRow;