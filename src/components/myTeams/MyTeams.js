import React from 'react';
import { useSelector } from 'react-redux';
import Team from '../team/Team';
import './myTeams.scss'

const MyTeams = () => {

    const myTeam = useSelector(state => state.apiData.myTeam)

    return (
        <div className="d-flex flex-column m-3 text-center">
            <h4 className="mb-4">My Team</h4>
            {
                !myTeam ?
                    <h5>Select your favorite team</h5>
                    :
                    <Team team={myTeam} large showName />

            }
        </div>
    );
};
// const mapStateToProps = state => ({
//     myTeam: state.team.myTeam
// })

// export default connect(mapStateToProps)(MyTeams);;
export default MyTeams;