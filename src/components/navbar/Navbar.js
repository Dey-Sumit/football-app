import React from 'react';
import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { MdChat } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './navbar.scss'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const myTeam = useSelector(state => state.apiData.myTeam)
    return (
        <div className="navbar">
            <div className="navbar__main">
                <Link to="/chat">
                    <MdChat className="navbar__icon" />
                </Link>
                <Link to="/">
                    <img src={myTeam?.logo} className="navbar__image" alt={myTeam?.name} />
                </Link>
                <Link to="/league">
                    <FaChartPie className="navbar__icon" />
                </Link>
            </div>
            <div className="navbar__settings">
                <Link to="/settings">
                    <FaUserCog className="navbar__icon" />
                </Link>
            </div>
        </div>
    );
};

// const mapStateToProps = state => ({
//     myTeamId: state.team.myTeamId
// })

// export default connect(mapStateToProps)(Navbar);
export default Navbar;