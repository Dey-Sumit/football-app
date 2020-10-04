import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { api } from '../../axios/axios';
import { useGlobalState } from '../../context/StateProvider';
import Fixtures from '../fixtures/Fixtures';
import LeagueTable from '../leagueTable/LeagueTable';
import MatchDetails from '../matchDetails/MatchDetails';
import Navbar from '../navbar/Navbar';
import './home.scss'

const Home = ({ history }) => {

    const [nextFixtures, setNextFixtures] = useState([])
    const [lastFixtures, setLastFixtures] = useState([])
    const [leagueId, setLeagueId] = useState(null)
    // const [loading, setLoading] = useState(false)
    const [{ user, myTeam }] = useGlobalState();

    // check if user and team present(check for auth)
    useEffect(() => {
        if (!user) {
            console.log("no user executed");
            history.push('/auth')
        }
    }, [])

    //set league id
    useEffect(() => {
        // setLoading(true)
        const callback = data => {
            let leagues = data.leagues;
            let league_id;
            for (let x = 0; x < leagues.length; x++) {
                if (leagues[x].type === "League")
                    league_id = leagues[x].league_id;
            }
            console.log(league_id);
            setLeagueId(league_id)
        }
        if (myTeam?.team_id) {
            const team_id = parseInt(myTeam.team_id)
            api(`leagues/team/${team_id}/2020`, callback)
        }
    }, [myTeam])

    //set next and last fixtures
    useEffect(() => {
        // setLoading(true)
        const callBack_1 = data => setLastFixtures(data.fixtures)
        const callBack_2 = data => setNextFixtures(data.fixtures)

        if (myTeam?.team_id) {
            const team_id = parseInt(myTeam.team_id)
            api(`fixtures/team/${team_id}/last/3`, callBack_1);
            api(`fixtures/team/${team_id}/next/3`, callBack_2);
        }

    }, [myTeam])

    return (
        <Container fluid className="home">
            <Row>
                <Col md={4} lg={3}>
                    {lastFixtures && nextFixtures &&
                        <Fixtures lastFixtures={lastFixtures} nextFixtures={nextFixtures} />}
                </Col>
                <Col md={5} lg={5}>
                    {lastFixtures && lastFixtures[0] &&
                        <MatchDetails fixture_id={lastFixtures[0].fixture_id} />
                    }
                </Col>
                <Col md={3} lg={4}>
                    {leagueId &&
                        <LeagueTable leagueId={leagueId} />}
                </Col>
            </Row>
            {/* navbar */}
            {myTeam && <Navbar />}
        </Container>
    );
};

export default withRouter(Home);