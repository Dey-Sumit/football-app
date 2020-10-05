import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { types } from '../../context/reducer';
import { useGlobalState } from '../../context/StateProvider';
import { auth, db } from '../../firebase/firebase';
import MyTeams from '../myTeams/MyTeams';
import Notification from '../notification/Notification';
import Search from '../search/Search';
import TeamsRow from '../teams-row/TeamsRow';
import './introPage.scss'

const ChooseTeam = () => {
    const [{ user_cred: { email, password }, myTeam }, dispatch] = useGlobalState()
    const history = useHistory()
    const [loading, setLoading] = useState(false)



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
    console.log(email, password);

    const handleClick = () => {
        if (myTeam) {
            setLoading(true);
            // 1. create the user
            // 2. use user as the id of the document and the team in database

            auth
                .createUserWithEmailAndPassword(email, password)
                .then(auth => {
                    // it successfully created a new user with email and password

                    var userId = auth.user.uid;

                    // put in global state
                    dispatch({
                        type: types.SET_USER,
                        payload: auth.user.uid,
                    });

                    // store in db
                    db
                        .collection('teams')
                        .doc(userId)
                        .set(
                            {
                                team_id: myTeam.team_id,
                                logo: myTeam.logo,
                                name: myTeam.name
                            }
                        )
                        .then(() => {
                            dispatch({
                                type: types.ADD_TO_MY_TEAM,
                                payload: myTeam
                            })
                            history.push('/')
                        })
                        .catch(
                            error => {
                                console.error(error)
                                toast.error(<Notification message={error.message} />,
                                    { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
                                setLoading(false);

                            }
                        )
                })
                .catch(error => console.log(error))


        }
    }

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
                    <Search title="Search Team" />
                </Col>
            </Row>
            <button className="nextPage" onClick={handleClick}>{myTeam ? "Let's Go 🚀" : "Choose your team"}</button>
        </Container>

    );
};

export default ChooseTeam;