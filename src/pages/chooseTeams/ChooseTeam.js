import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import TeamsRow from '../../components/teams-row/TeamsRow'
import MyTeams from '../../components/myTeams/MyTeams'
import Search from '../../components/search/Search';

import './chooseTeams.scss'
import { update_profile } from '../../redux/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'

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



const ChooseTeam = () => {
    const history = useHistory()

    const { profile, loading } = useSelector(state => state.auth)
    const { myTeam } = useSelector(state => state.apiData)

    const dispatch = useDispatch()

    const handleClick = () => {
        if (!myTeam) return;
        dispatch(update_profile())
    }
    useEffect(() => {
        if (profile?.team) {
            history.push('/')
        }

    }, [profile, history])


    return (
        <Container fluid>

            <Row>
                <Col md={7}>
                    <TeamsRow country="Laliga" teams={teamsOfSpain} />
                    <TeamsRow country="Premier League" teams={teamsOfEngland} />
                    <TeamsRow country="Others" teams={otherTeams} />
                </Col>
                <Col md={5} className="my-sm-5 my-md-0">
                    <MyTeams />
                    <Search title="Search Team" />
                </Col>
            </Row>
            <button className="nextPageLink" onClick={handleClick}>
                {loading ? <Spinner animation="grow" /> :
                    myTeam ? "Let's Go 🚀" : "Choose your team"}
            </button>
        </Container>

    );
};

// const mapStateToProps = (state) => ({
//     myTeamId: state.team.myTeamId,
//     has_profile: state.auth.has_profile,
//     userId: state.auth.userId,
//     loading: state.auth.loading
// })
// export default connect(mapStateToProps, { create_or_update_user_in_db })(ChooseTeam);
export default ChooseTeam;