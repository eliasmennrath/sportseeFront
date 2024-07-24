import React from 'react';
import { useState, useEffect } from 'react';
import useFetch from '../utils/useFetch.js';

import PropTypes from 'prop-types';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from 'recharts';


import Activity from '../models/Activity.js';

// styles
import './dailyActivity.css';


const renderLegend = (props) => {
    const { payload } = props;

    return (
        <ul id="dailyLegend">
        {
            payload.map((entry, index) => (
            <li key={`item-${index}`} id={`${entry.value}Legend`}>
                {
                    entry.value === 'kilogram' ? 'Poids(kg)' 
                    : entry.value === 'calories' ? 'Calories brulées (kCal)' 
                    : entry.value 
                }
            </li>
            ))
        }
        </ul>
    );
}

const ticks = (props) => {

    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={7} y={0} dy={16} textAnchor="end" fill="#666" >
                {payload.value.split('-')[2]}
            </text>
        </g>
    );
}



export default function DailyActivity({id}) {

    const [activity, setActivity] = useState([]);

    const { loading, data, error } = useFetch(`http://localhost:3001/user/${id}/activity`)

    useEffect(() => {
        if(data) {
            setActivity(new Activity(data));
        }
    }, [data]);

    if(loading) {
        return 'Loading';
    }
    if(error) {
        return error;
    }

    return (
        <ResponsiveContainer width={"100%"} height={"100%"}>
            <h2>Activité quotidienne</h2>
            <BarChart
                data={activity.activity}
                margin={{
                    top: 25,
                    right: 25,
                    left: 25,
                    bottom: 25,
                }}
                barGap={8}
            >
                <CartesianGrid strokeDasharray="2" vertical={false}/>
                <YAxis yAxisId={"leftAxis"} domain={['dataMin - 50', 'dataMax + 10']} hide={true}/>
                <YAxis yAxisId={"rightAxis"} orientation='right' domain={['dataMin - 2', 'dataMax + 5']} tickCount={3} axisLine={false} tickLine={false} tickMargin={30}/>
                <XAxis dataKey="day" tickLine={false} scale={"point"} padding={{ left: 11, right: 11 }} fontSize={14} tick={ticks}/>
                <Tooltip content={({active, payload}) => 
                    active &&
                    <div className='tooltip' >
                        <div className="">{payload[0].value}kg</div>
                        <div className="">{payload[1].value}kCal</div>
                    </div>
                }/>

                <Legend verticalAlign={'top'} align={"right"} content={renderLegend}/>
                <Label value='test'/>
        
                <Bar dataKey="kilogram" yAxisId={"rightAxis"} fill="#000000"  radius={[50, 50, 0, 0]} barSize={7}/>
                <Bar dataKey="calories" yAxisId={"leftAxis"} fill="#ff0000" radius={[50, 50, 0, 0]} barSize={7}/>
            </BarChart>
        </ResponsiveContainer>
    );
}


DailyActivity.propTypes = {
    id: PropTypes.number
};