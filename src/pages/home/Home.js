import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';


import Fixtures from '../../components/fixtures/Fixtures';
import MatchDetails from '../../components/matchDetails/MatchDetails';
// import Navbar from '../../components/navbar/Navbar';
import { connect } from 'react-redux'
import { get_last_and_next_fixtures } from '../../redux/actions/team.action'
import './home.scss'
import { useHistory } from 'react-router-dom';

//TODO protect the route

const Home = ({ my_team_id, user_id, get_last_and_next_fixtures }) => {
    const history = useHistory();

    //set league id
    // useEffect(() => {
    //     setLoading(true)
    //     const callback = data => {

    //         let leagues = data.leagues;
    //         let league_id;
    //         for (let x = 0; x < leagues.length; x++) {
    //             if (leagues[x].type === "League")
    //                 league_id = leagues[x].league_id;
    //         }

    //         setLeagueId(league_id)
    //     }
    //     if (myTeam?.team_id) {
    //         const team_id = parseInt(myTeam.team_id)
    //         //api(`leagues/team/${team_id}/2020`, callback)
    //     }
    // }, [myTeam])

    //set next and last fixtures
    useEffect(() => {
        if (!user_id)
            history.push('/auth')
    }, [user_id, history])

    useEffect(() => {
        console.log(" use effect in home");
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