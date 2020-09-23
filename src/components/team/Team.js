import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { types } from '../../context/reducer';
import { useGlobalState } from '../../context/StateProvider';
import './team.scss'

const Team = ({ team: { name, logo, team_id }, small, noName }) => {
    var classes = small ? 'team__logo-small' : 'team__logo'

    const [{ myTeams }, dispatch] = useGlobalState();
    const [added, setAdded] = useState(false)

    const toggleMyTeams = () => {
        // check if it is already added
        // if it is already added , remove the team
        if (added) {
            dispatch({
                type: types.REMOVE_FROM_MY_TEAMS,
                payload: team_id
            })
            setAdded(false)
        }
        else {
            dispatch({
                type: types.ADD_TO_MY_TEAMS,
                payload: {
                    team_id,
                    logo,
                    name
                }
            })
            setAdded(true)
        }
    }
    return (
        <Col className="team" key={name} onClick={() => toggleMyTeams()}>
            <img src={logo} alt={name} className={classes} />

            {!noName && <p className="team__name mt-2">{name}</p>}
            {added ?
                <span span className="team-added">
                    <FaCheckCircle />
                </span> : null
            }

        </Col >
    );
};

export default Team;