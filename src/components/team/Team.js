import React from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { types } from '../../redux/types';
import './team.scss'

const Team = ({ closeSearch, team, small, large, showName }) => {
    var classes = small ? 'team__logo-small' : large ? 'team__logo-large' : 'team__logo'

    const dispatch = useDispatch()

    const { team_id, name, logo } = team
    const updateMyTeam = () => {
        if (closeSearch)
            closeSearch();

        dispatch({
            type: types.SET_MY_TEAM,
            payload: { team_id, name, logo }
        })
    }

    return (
        <Col className='team' onClick={updateMyTeam}>
            <img src={logo} alt={name} className={classes} />
            {showName && <span className="team__name mt-2">{name}</span>}



        </Col >
    );
}


export default Team;