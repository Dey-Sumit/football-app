import React from 'react';
import { useSelector } from 'react-redux'

import SkeletonCard from '../skeletons/SkeletonCard';
import './stats.scss'


const StatsBar = ({ data: { home, away }, text }) => {

    home = parseInt(home)
    away = parseInt(away)
    var total = home + away

    const homeBarWidth = (100 / total) * home
    const awayBarWidth = Math.floor((100 / total) * away)

    var homeBarClass, awayBarClass;

    //TODO refractor the colors
    if (homeBarWidth > awayBarWidth) {
        homeBarClass = 'statsBar__home linear_blue'
        awayBarClass = 'statsBar__away linear_gray'
    }
    else {
        awayBarClass = 'statsBar__away linear_red'
        homeBarClass = 'statsBar__home linear_gray'
    }

    return (
        <div className="statsBar">
            <p className="text-center">{text}</p>
            <div className="statsBar__data">
                <div className="statsBar__home-wrapper">
                    <div className={homeBarClass} style={{ 'width': `${homeBarWidth}%` }} >{home}</div>
                </div>
                <div className="statsBar__away-wrapper">
                    <div className={awayBarClass} style={{ 'width': `${awayBarWidth}%` }}>{away}</div>
                </div>

            </div>
        </div>
    );
};


const Stats = () => {

    const { statistics: stats } = useSelector(state => state.apiData.fixtureDetails)
    return (
        stats ?
            <div>
                <StatsBar data={stats['Ball Possession']} text="Possession" />
                <StatsBar data={stats['Passes %']} text="Passes %" />
                <StatsBar data={stats['Total passes']} text="Total Passes" />
                <StatsBar data={stats['Total Shots']} text="Total Shots" />
                <StatsBar data={stats['Yellow Cards']} text="Yellow Cards" />
                <StatsBar data={stats['Corner Kicks']} text="Corner Kicks" />

            </div> : <SkeletonCard width='100%' height={30} count={6} />
    );
};

export default Stats;