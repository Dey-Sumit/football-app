import React from 'react';
import { Row } from 'react-bootstrap';
import { useGlobalState } from '../../context/StateProvider';
import Team from '../team/Team';
import './myTeams.scss'

const MyTeams = () => {

    const [{ myTeam },] = useGlobalState();

    return (
        <Row className="teams-row">
            <h4 className="my-teams__title">My Team</h4>
            {
                !myTeam ? <h5 className="text-center">Select your favorite team</h5>
                    :
                    <Team team={myTeam} noCheck large />

            }
        </Row>
    );
};

export default MyTeams;