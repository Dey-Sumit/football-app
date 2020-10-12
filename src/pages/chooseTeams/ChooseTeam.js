import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import TeamsRow from '../../components/teams-row/TeamsRow'
import MyTeams from '../../components/myTeams/MyTeams'
import Search from '../../components/search/Search';

import './chooseTeams.scss'
import { create_or_update_user_in_db } from '../../redux/actions/auth.action'
import { connect } from 'react-redux'

const ChooseTeam = ({ has_profile, my_team_id, create_or_update_user_in_db, user_id, loading }) => {
    console.log("choose team");
    const history = useHistory()
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
        if (!my_team_id) return;
        create_or_update_user_in_db(user_id, my_team_id)
    }
    useEffect(() => {
        if (has_profile) {
            console.log("has profile");
            history.push('/')
        }

    }, [has_profile, history])


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
            <button className="nextPage" onClick={handleClick}>
                {loading ? <Spinner animation="grow" /> :
                    my_team_id ? "Let's Go 🚀" : "Choose your team"}
            </button>
        </Container>

    );
};

const mapStateToProps = (state) => ({
    my_team_id: state.team.my_team_id,
    has_profile: state.auth.has_profile,
    user_id: state.auth.user_id,
    loading: state.auth.loading
})
export default connect(mapStateToProps, { create_or_update_user_in_db })(ChooseTeam);