import React from 'react';
import './others.scss'
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import LeagueTable from '../../components/leagueTable/LeagueTable'
import { useDispatch, useSelector } from 'react-redux'
import { get_domestic_league_id } from '../../redux/actions/team.action'
import TopPlayers from '../../components/topPlayers/TopPlayers';
import Navbar from '../../components/navbar/Navbar';

// champions league


const Others = () => {


    const teamId = useSelector(state => state.apiData.teamId)
    const domesticLeagueId = useSelector(state => state.apiData.domesticLeagueId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_domestic_league_id(teamId))
    }, [teamId, dispatch])



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
        <>
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
            <Navbar />
        </>

    );
};

export default Others;