import React from 'react';
import './stats.scss'
const StatsBar = ({ data: { home, away }, heading }) => {
    home = parseInt(home)
    away = parseInt(away)
    var total = home + away

    const homeBarWidth = (100 / total) * home
    const awayBarWidth = Math.floor((100 / total) * away)

    var homeBarClass, awayBarClass;
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
            <p className="text-center">{heading}</p>
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


const Stats = ({ stats }) => {
    return (
        <div>
            <StatsBar data={stats['Ball Possession']} heading="Possession" />
            <StatsBar data={stats['Passes %']} heading="Passes %" />
            <StatsBar data={stats['Total passes']} heading="Total Passes" />
            <StatsBar data={stats['Total Shots']} heading="Total Shots" />
            <StatsBar data={stats['Yellow Cards']} heading="Yellow Cards" />
            <StatsBar data={stats['Corner Kicks']} heading="Corner Kicks" />

        </div>
    );
};

export default Stats;