import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'


import Fixtures from '../../components/fixtures/Fixtures';
import MatchDetails from '../../components/matchDetails/MatchDetails';
import { get_last_and_next_fixtures } from '../../redux/actions/team.action'
import Navbar from '../../components/navbar/Navbar';

// no css
import './home.scss'


const Home = () => {

    // from redux
    const dispatch = useDispatch()
    const myTeam = useSelector(state => state.apiData.myTeam)

    useEffect(() => {
        if (myTeam)
            dispatch(get_last_and_next_fixtures(myTeam.team_id))
    }, [myTeam, dispatch])

    return (
        <>
            <Container className="p-2 home">
                <Row className="mb-5">
                    <Col md={5} className="mb-2">
                        <h5 className="text-center">Fixtures</h5>
                        <Fixtures />
                    </Col>
                    <Col md={7}>
                        <h5 className="text-center">Last Match Details</h5>
                        <MatchDetails />
                    </Col>
                </Row>

            </Container>
            <Navbar />
        </>
    );
};

export default Home;