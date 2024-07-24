import { useState,useEffect } from "react";
import useFetch from "../utils/useFetch.js";
import Performance from "../models/Performance.js";

import propTypes from 'prop-types';

import { 
    PolarAngleAxis, 
    PolarGrid, 
    PolarRadiusAxis, 
    Radar, 
    RadarChart, 
    ResponsiveContainer 
} from "recharts";



export default function Performances({id}) {

    const [performance, setPerformance] = useState([]);

    const { loading, data, error } = useFetch(`http://localhost:3001/user/${id}/performance`)


    useEffect(() => {
        if(data) {
            setPerformance(new Performance(data));
        }
    }, [data]);

    if(loading) {
        return 'Loading';
    }
    if(error) {
        return error;
    }

    return (
        <ResponsiveContainer>
            <RadarChart data={performance.performances} width={'50%'} outerRadius={'50%'}>
                <PolarAngleAxis dataKey='category'  tick={{fill: 'white', fontSize: 10, fontWeight: 500}}/>
                <PolarRadiusAxis domain={['auto', 'dataMax + 30']} axisLine={false} tick={false}/>
                <PolarGrid gridType="polygon" radialLines={false}/>
                <Radar dataKey='value' fill="#fa0000" fillOpacity={0.6}/>
            </RadarChart>
        </ResponsiveContainer>
    )
}

Performances.propTypes = {
    progress: propTypes.number
}