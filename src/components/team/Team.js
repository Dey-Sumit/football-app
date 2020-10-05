import React from 'react';
import { Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { types } from '../../context/reducer';
import { useGlobalState } from '../../context/StateProvider';
import './team.scss'

const Team = ({ team: { name, logo, team_id }, small, large, noName, noCheck }) => {
    var classes = small ? 'team__logo-small' : large ? 'team__logo-large' : 'team__logo'

    const [{ myTeam }, dispatch] = useGlobalState();
    const updateMyTeam = () => {
        console.log("update ", name);
        dispatch({
            type: types.ADD_TO_MY_TEAM,
            payload: {
                team_id,
                logo,
                name
            }
        })
    }

    return (
        <Col className={noCheck ? 'team myTeam' : 'team'} key={name} onClick={() => updateMyTeam()}>
            <img src={logo} alt={name} className={classes} />

            {!noCheck && <p className="team__name mt-2">{name}</p>}
            {  myTeam && myTeam.team_id === team_id ?
                <span className="team-added">
                    <FaCheckCircle />
                </span> : null
            }

        </Col >
    );
}
export default Team;