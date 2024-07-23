import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";


import "./goalProgress.css";


export default function GoalProgress({progress}) {
    return (
        <ResponsiveContainer>
            <h2 id='progressTitle'>Score</h2>
            <PieChart>
                <Pie 
                    data={progress}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={85}
                    fill="#fff"
                    isAnimationActive={false}
                >
                </Pie>
                <Pie
                    cx="50%"
                    cy="50%"
                    data={progress}
                    dataKey={'value'}
                    startAngle={90}
                    endAngle={90+progress[0].value*360/100}
                    innerRadius={80}
                    outerRadius={90}
                    cornerRadius={50}
                    fill="#ff0000"
                >
                </Pie>
                <Legend layout="vertical" align="center" verticalAlign="middle" content={({payload})=>
                    <div id="percentage">
                        <em>{payload[0].payload.value + '%' || 'error'}</em>
                        <p>de votre <br/>objectif</p>
                    </div>
                }/>
            </PieChart>
        </ResponsiveContainer>
    );

}