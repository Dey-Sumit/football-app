import React from 'react';
import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.scss'
import { connect } from 'react-redux'

const Navbar = ({ my_team_id }) => {

    return (
        <div className="navbar">

            <Link to="/others">
                <FaChartPie className="navbar__icon" />
            </Link>
            <Link to="/">
                <img src={`https://media.api-sports.io/football/teams/${my_team_id}.png`} className="navbar__image" alt="" />
            </Link>
            <Link to="/settings">
                <FaUserCog className="navbar__icon" />
            </Link>
        </div>
    );
};

const mapStateToProps = state => ({
    my_team_id: state.team.my_team_id
})

export default connect(mapStateToProps)(Navbar);