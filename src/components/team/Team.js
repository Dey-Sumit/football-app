import React from 'react';
import { Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { types } from '../../redux/types';
import { connect } from 'react-redux'
import './team.scss'

const Team = ({ closeSearch, team_id, name, small, large, noCheck, dispatch, myTeamId }) => {
    var classes = small ? 'team__logo-small' : large ? 'team__logo-large' : 'team__logo'

    const updateMyTeam = () => {
        if (closeSearch)
            closeSearch();
        dispatch({
            type: types.SET_MY_TEAM,
            payload: team_id
        })
    }

    return (
        <Col className={noCheck ? 'team myTeam' : 'team'} onClick={() => updateMyTeam()}>
            <img src={`https://media.api-sports.io/football/teams/${team_id}.png`} alt="team logo" className={classes} />
            {name && <span className="team_name">{name}</span>}

            { !noCheck && myTeamId === team_id ?
                <span className="team-added">
                    <FaCheckCircle />
                </span> : null
            }

        </Col >
    );
}
const mapStateToProps = state => ({
    myTeamId: state.team.myTeamId
})

export default connect(mapStateToProps)(Team);