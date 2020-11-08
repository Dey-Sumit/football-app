import React from 'react';
import './others.scss'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeagueTable from '../../components/leagueTable/LeagueTable'
import { connect } from 'react-redux'
import { get_domestic_league_id } from '../../redux/actions/team.action'
import TopPlayers from '../../components/topPlayers/TopPlayers';

// champions league


const Others = ({ get_domestic_league_id, domesticLeagueId, teamId }) => {

    useEffect(() => {
        get_domestic_league_id(teamId)
    }, [teamId, get_domestic_league_id])
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
                    <LeagueTable league_id={domesticLeagueId} />
                </Col>
                <Col md={6} lg={7}>
                    <TopPlayers league_id={domesticLeagueId} />
                </Col>
            </Row>

        </Container>

    );
};
const mapStateToProps = state => ({
    domesticLeagueId: state.team.domesticLeagueId,
    teamId: state.team.my_teamId
})
export default connect(mapStateToProps, { get_domestic_league_id })(Others);