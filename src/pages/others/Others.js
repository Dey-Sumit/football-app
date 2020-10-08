import React from 'react';
import './others.scss'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeagueTable from '../../components/leagueTable/LeagueTable'
import { connect } from 'react-redux'
import { get_domestic_league_id } from '../../redux/actions/team.action'
import TopPlayers from '../../components/topPlayers/TopPlayers';

// champions league


const Others = ({ get_domestic_league_id, domestic_league_id, team_id }) => {

    useEffect(() => {
        get_domestic_league_id(team_id)
    }, [team_id, get_domestic_league_id])
    // const [topPlayers, setTopPlayers] = useState([])
    // useEffect(() => {
    //     const callback = (data) => {
    //         console.log(data);
    //         setTopPlayers(data.topscorers.slice(0, 7));
    //     }
    //     api(`, callback)
    // }, [])

    return (
        // <div className="topPlayers">
        //     {topPlayers.length > 0 &&
        //        )
        //     }
        // </div>
        <Container >
            <Row>
                <Col md={6} lg={5}>
                    <LeagueTable league_id={domestic_league_id} />
                </Col>
                <Col md={6} lg={7}>
                    <TopPlayers league_id={domestic_league_id} />
                </Col>
            </Row>

        </Container>

    );
};
const mapStateToProps = state => ({
    domestic_league_id: state.team.domestic_league_id,
    team_id: state.team.my_team_id
})
export default connect(mapStateToProps, { get_domestic_league_id })(Others);