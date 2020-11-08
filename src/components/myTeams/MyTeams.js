import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Team from '../team/Team';
import './myTeams.scss'

const MyTeams = () => {

    const myTeam = useSelector(state => state.apiData.myTeam)

    return (
        <Row className="d-flex flex-column my-3 text-center">
            <h4 className="mb-4">My Team</h4>
            {
                !myTeam ?
                    <h5>Select your favorite team</h5>
                    :
                    <Team team={myTeam} large showName />

            }
        </Row>
    );
};
// const mapStateToProps = state => ({
//     myTeam: state.team.myTeam
// })

// export default connect(mapStateToProps)(MyTeams);;
export default MyTeams;