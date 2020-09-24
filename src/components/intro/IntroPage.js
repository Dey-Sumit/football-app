import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../context/StateProvider';
import { db } from '../../firebase/firebase';
import MyTeams from '../myTeams/MyTeams';
import Search from '../search/Search';
import TeamsRow from '../teams-row/TeamsRow';
import './introPage.scss'

const IntroPage = () => {
    const [{ user, myTeam }] = useGlobalState()
    useEffect(() => {
        // database call for the user and check if the user exist in database
    }, [])
    const history = useHistory();
    const teamsOfSpain = [
        {
            team_id: '541',
            name: 'Real Madrid',
            logo: 'https://media.api-sports.io/football/teams/541.png'
        },
        {
            team_id: '529',
            name: 'Barcelona',
            logo: 'https://media.api-sports.io/football/teams/529.png'
        },
        {
            team_id: '530',
            name: 'Atletico Madrid',
            logo: 'https://media.api-sports.io/football/teams/530.png'
        },
        {
            team_id: '535',
            name: 'Malaga FC',
            logo: 'https://media.api-sports.io/football/teams/535.png'
        },
    ]
    const teamsOfEngland = [
        {
            team_id: '49',
            name: 'Chelsea',
            logo: 'https://media.api-sports.io/football/teams/49.png'
        },
        {
            team_id: '33',
            name: 'Manchester United',
            logo: 'https://media.api-sports.io/football/teams/33.png'
        },
        {
            team_id: '40',
            name: 'Liverpool',
            logo: 'https://media.api-sports.io/football/teams/40.png'
        },
        {
            team_id: '50',
            name: 'Man. City',
            logo: 'https://media.api-sports.io/football/teams/50.png'
        },
    ]
    const otherTeams = [
        {
            team_id: '157',
            name: 'Bayern Munich',
            logo: 'https://media.api-sports.io/football/teams/157.png'
        },
        {
            team_id: '85',
            name: 'Paris Saint Germain',
            logo: 'https://media.api-sports.io/football/teams/85.png'
        },
        {
            team_id: '194',
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png'
        },
    ]
    const handleClick = () => {
        if (myTeam) {
            // store the user and the team in database
            db.collection('users').add({
                user: user,
                team: myTeam.team_id
            })
                .then(
                    history.push('/home')
                )
                .catch(
                    error => console.error(error)
                )

        }
    }
    console.log(user, myTeam);
    return (

        <Container fluid className="choose-teams">
            <Row>
                <Col md={7} className="">
                    <TeamsRow country="Laliga" teams={teamsOfSpain} />
                    <TeamsRow country="Premier League" teams={teamsOfEngland} />
                    <TeamsRow country="Others" teams={otherTeams} />
                </Col>
                <Col md={5} className="my-sm-5 my-md-0">
                    <MyTeams />
                    <Search />
                </Col>
            </Row>
            <button className="nextPage" onClick={handleClick}>{myTeam ? "Let's Go 🚀" : "Choose your team"}</button>
        </Container>

    );
};

export default IntroPage;