import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, api_multiple } from '../../axios/axios';
import Fixture from '../fixture/Fixture';
import './fixtures.scss'
const Fixtures = () => {
    // get last and next 5 Fixtures
    const [nextOrCurrentFixture, setNextOrCurrentFixture] = useState(null)
    const [nextFixtures, setNextFixtures] = useState([])
    const [lastFixtures, setLastFixtures] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const callBack_1 = data =>
            setLastFixtures(data.fixtures)
        const callBack_2 = data => {
            setNextFixtures(data.fixtures)
            setLoading(false)
        }
        api_multiple('fixtures/team/541/last/3', 'fixtures/team/541/next/3', callBack_1, callBack_2)
    }, [])


    return (
        <div>
            {
                !loading &&
                lastFixtures.length > 0 &&
                lastFixtures.map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} last />
                )
            }
            {
                !loading &&
                nextFixtures.length > 0 &&
                nextFixtures.map(fixture =>
                    <Fixture key={fixture.fixture_id} fixture={fixture} next />
                )
            }
        </div >
    );
};

export default Fixtures;