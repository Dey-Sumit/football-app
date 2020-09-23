import React from 'react';
import { FaChartPie, FaUserCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './navbar.scss'
const Navbar = () => {
    return (
        <div className="navbar">
            <FaChartPie />
            <h6>Icon</h6>

            <Link to="/settings">
                <FaUserCog />
            </Link>
        </div>
    );
};

export default Navbar;