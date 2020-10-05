import React from 'react';
import { Row } from 'react-bootstrap';
import Team from '../team/Team';
import './myTeams.scss'
import { connect } from 'react-redux'
const MyTeams = ({ my_team_id }) => {


    return (
        <Row className="teams-row">
            <h4 className="my-teams__title">My Team</h4>
            {
                !my_team_id ?
                    <h5 className="text-center">Select your favorite team</h5>
                    :
                    <Team team_id={my_team_id} noCheck large />

            }
        </Row>
    );
};
const mapStateToProps = state => ({
    my_team_id: state.team.my_team_id
})

export default connect(mapStateToProps)(MyTeams);;