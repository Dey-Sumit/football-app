import React from 'react';
import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../context/StateProvider';
import './navbar.scss'
const Navbar = () => {
    const [{ myTeam }] = useGlobalState();
    return (
        <div className="navbar">

            <Link to="/others">
                <FaChartPie className="navbar__icon" />
            </Link>
            {/* //TODO if the route is already home;do something to save api calls */}
            <Link to="/">
                <img src={myTeam.logo} className="navbar__image" alt="" />
            </Link>
            <Link to="/settings">
                <FaUserCog className="navbar__icon" />
            </Link>
        </div>
    );
};

export default Navbar;