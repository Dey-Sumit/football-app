import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

import { api } from '../../axios/axios';

import Fixtures from '../../components/fixtures/Fixtures';
// import LeagueTable from '../../components/leagueTable/LeagueTable';
// import MatchDetails from '../../components/matchDetails/MatchDetails';
// import Navbar from '../../components/navbar/Navbar';
import { connect } from 'react-redux'

import './home.scss'
import { useHistory } from 'react-router-dom';

//TODO protect the route

const Home = ({ my_team_id, user_id }) => {
    const history = useHistory();
    // console.log(isAuthenticated);


    const [nextFixtures, setNextFixtures] = useState([])
    const [lastFixtures, setLastFixtures] = useState([])
    // const [leagueId, setLeagueId] = useState(null)
    const [loading, setLoading] = useState(true)
    // console.log("homeeee");




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
        let isMounted = true;
        const callBack_1 = data => setLastFixtures(data.fixtures)
        const callBack_2 = data => {
            // console.log("Executed", data);
            setNextFixtures(data.fixtures)
            setLoading(false)
        }
        // // console.log("USE EFFECT ", team_id);
        // if (isMounted && my_team_id) {
        //     api(`fixtures/team/${my_team_id}/last/3`, callBack_1);
        //     api(`fixtures/team/${my_team_id}/next/5`, callBack_2);
        // }
        return () => isMounted = false;
    }, [my_team_id])

    return (
        <Container fluid className="home">
            <Row>
                <Col md={4} lg={3}>
                    {!loading ?
                        <Fixtures lastFixtures={lastFixtures} nextFixtures={nextFixtures} />
                        : <Skeleton count={8} height={70} />
                    }

                </Col>
                {/* <Col md={5} lg={5}>
                    {lastFixtures[0] ?
                        <MatchDetails fixture_id={lastFixtures[0].fixture_id} />
                        : <Skeleton height={650} />
                    }
                </Col>
                <Col md={3} lg={4}>
                    {leagueId ?
                        <LeagueTable leagueId={leagueId} />
                        : <Skeleton height={550} />
                    }
                </Col> */}
            </Row>
            {/* navbar */}

        </Container>
    );
};

const mapStateToProps = state => ({
    my_team_id: state.team.my_team_id,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps)(Home);