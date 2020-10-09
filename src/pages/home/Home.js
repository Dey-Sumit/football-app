import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Fixtures from '../../components/fixtures/Fixtures';
import MatchDetails from '../../components/matchDetails/MatchDetails';
import { connect } from 'react-redux'

import { get_last_and_next_fixtures } from '../../redux/actions/team.action'
import './home.scss'


const Home = ({ my_team_id, get_last_and_next_fixtures }) => {


    useEffect(() => {

        //it may take some time to load the team id from redux
        if (my_team_id)
            get_last_and_next_fixtures(my_team_id)
    }, [my_team_id, get_last_and_next_fixtures])

    return (
        <Container className="home">
            <Row>
                <Col md={5}>
                    <Fixtures />
                </Col>
                <Col md={7}>
                    <MatchDetails />
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => ({
    my_team_id: state.team.my_team_id,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps, { get_last_and_next_fixtures })(Home);