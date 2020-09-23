import React, { useEffect, useState } from 'react';
import { api } from '../../axios/axios';

const HeadToHead = ({ homeTeam, awayTeam }) => {

    const [data, setData] = useState()
    useEffect(() => {
        const callback = data => setData(data)
        api(`fixtures/h2h/${homeTeam.team_id}/${awayTeam.team_id}`, callback)
    }, [])
    console.log(data);
    return (
        <div>
            Head 2 head huuu
        </div>
    );
};

export default HeadToHead;