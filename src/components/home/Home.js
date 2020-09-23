import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { call_api } from '../../axios/axios';
import Fixtures from '../fixtures/Fixtures';
import LeagueTable from '../leagueTable/LeagueTable';
import MatchDetails from '../matchDetails/MatchDetails';
import Navbar from '../navbar/Navbar';
import './home.scss'

const Home = () => {
    const [teamDetails, setTeamDetails] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const callback = data => {
            console.log(data);
            setTeamDetails(data.teams[0])
            setLoading(false)
        }
        //call_api('teams/team/541', callback)
    }, [])


    return (
        <Container fluid className="home">
            {!loading && teamDetails &&
                <div className="home__header">
                    <h4 className="team__name">{teamDetails.name}</h4>
                    <img src={teamDetails.logo} alt="" className="team__logo-small" />
                </div>
            }
            <Row>
                <Col md={5} lg={3}>
                    <Fixtures />
                </Col>
                <Col md={5} lg={5}>
                    {/* <h5>Last Match or current Match</h5> */}
                    <MatchDetails />
                </Col>
                <Col md={4} lg={4}>
                    {/* league table */}
                    {/* <LeagueTable /> */}
                </Col>
            </Row>
            <Navbar />
        </Container>
    );
};

export default Home;