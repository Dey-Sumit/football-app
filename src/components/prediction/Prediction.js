import React, { useEffect, useState } from 'react';
import { api } from '../../axios/axios';
import './prediction.scss'
import { Radar } from 'react-chartjs-2'

const Chart = ({ labels, home, away }) => {
    console.log(home, away);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'awayTeam',
                data: away,
                borderColor: 'rgba(181, 137, 254, 1)',
                backgroundColor: 'rgba(181, 137, 254, 0.4)',
            },
            {
                label: 'homeTeam',
                data: home,
                borderColor: 'rgba(5, 212, 113, 1)',
                backgroundColor: 'rgba(5, 212, 113, 0.4)'
            }]
    }
    const options = {
        scale: {
            angleLines: {
                color: 'rgba(255,255,255,0.8)' // lines radiating from the center
            },
            gridLines: {
                color: 'rgba(255,255,255,0.8)'
            },
        },
        legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: '#fff',
                fontSize: 14
            }
        }
    }
    return (
        <Radar data={data} options={options} />
    )
}


const Prediction = () => {
    const [prediction, setPrediction] = useState();
    useEffect(() => {
        const callback = (data) => setPrediction(data.predictions[0])
        api('predictions/605088', callback)
    }, [])
    // console.log(prediction);
    var labels = [], home = [], away = []
    if (prediction) {
        for (let o in prediction.comparison) {
            labels.push(o)
            // console.log(prediction.comparison[o])
            home.push(parseInt(prediction.comparison[o].home))
            away.push(parseInt(prediction.comparison[o].away))
        }
        labels.push('win')
        home.push(parseInt(prediction.winning_percent.home))
        away.push(parseInt(prediction.winning_percent.away))

    }

    return (
        <div>
            <Chart labels={labels} home={home} away={away} />
        </div>
    );
};

export default Prediction;