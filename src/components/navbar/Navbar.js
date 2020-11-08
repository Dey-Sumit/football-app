import React from 'react';
import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.scss'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const myTeam = useSelector(state => state.apiData.myTeam)
    return (
        <div className="navbar">

            <Link to="/others">
                <FaChartPie className="navbar__icon" />
            </Link>
            <Link to="/">
                <img src={myTeam.logo} className="navbar__image" alt={myTeam.name} />
            </Link>
            <Link to="/settings">
                <FaUserCog className="navbar__icon" />
            </Link>
        </div>
    );
};

// const mapStateToProps = state => ({
//     myTeamId: state.team.myTeamId
// })

// export default connect(mapStateToProps)(Navbar);
export default Navbar;