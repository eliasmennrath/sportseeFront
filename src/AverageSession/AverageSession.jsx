import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import useFetch from "../utils/useFetch";

import Session from "../models/Session";

import { LineChart, XAxis, YAxis, Line, Tooltip, Rectangle } from "recharts";


import "./averageSession.css";


const CustomCursor = (props) => {
    const { points, width, height, stroke } = props;
    const { x, y } = points[0];
    const { x1, y1 } = points[1];
    return (
        <Rectangle  
            fill="rgba(0, 0, 0, 0.1)"
            stroke="red"
            x={x}
            y={y}
            width={width}
            height={height}
        />
    );
};


export default function AverageSession({id}) {
    

    const [session, setSession] = useState([]);

    const { loading, data, error } = useFetch(`http://localhost:3001/user/${id}/average-sessions`);

    useEffect(() => {
        if(data) {
            setSession(new Session(data));
        }
    }, [data]);

    if (loading) {
        return 'Loading';
    }
    if (error) {
        return error;
    }
    

    return (
        <React.Fragment>
            <ResponsiveContainer style={{background: 'rgb(255, 0, 0)'}}>
            <h2 className="avg-title">Durée moyenne des sessions</h2>
                <LineChart data={session.sessions} margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
                    <XAxis dataKey="day" padding={{ left: 10, right: 10 }} axisLine={false} tickLine={false} tick={{stroke: 'white', strokeWidth: 1}}/>
                    <YAxis hide={true} domain={['dataMin - 5', 'dataMax + 20']}/>
                    <Line type="monotone" dataKey="sessionLength" dot={false} activeDot={true} strokeWidth={2} stroke="#fff"/>
                    <Tooltip cursor={<CustomCursor />} content={({active, payload}) => 
                        active &&
                        <div className='avg-tooltip' >
                            <div className="">{payload[0].value}min</div>
                        </div>
                    }/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );

}   