import React from 'react';
import { Row } from 'react-bootstrap';
import { useGlobalState } from '../../context/StateProvider';
import Team from '../team/Team';
import './myTeams.scss'

const MyTeams = () => {

    const [{ myTeams },] = useGlobalState();

    return (
        <Row className="teams-row">
            <h4 className="my-teams__title">My Teams</h4>
            {
                myTeams.length === 0 && <h5 className="text-center">Select your favorite team</h5>
            }
            <Row className="teams-row__teams">
                {
                    myTeams.map(team => <Team team={team} id={team.id} />)
                }
            </Row>
        </Row>
    );
};

export default MyTeams;