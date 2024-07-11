import React from "react";
import { ResponsiveContainer, PieChart, Pie, Legend } from "recharts";


import "./goalProgress.css";


export default function GoalProgress({progress}) {
    // return (
    //     <React.Fragment>
    //         <div id="scoreCard">
    //             <h2>Score</h2>
    //             <div className="circle">
    //                 <svg viewBox="0 0 36 36" className="circular-chart">
    //                     <path className="circle-bg"
    //                             d="M18 2.0845
    //                             a 15.9155 15.9155 0 0 1 0 31.831
    //                             a 15.9155 15.9155 0 0 1 0 -31.831"
    //                     />
    //                     <path className="circle-progress"
    //                             strokeDasharray={ progress + ", 100"}
    //                             d="M18 2.0845
    //                             a 15.9155 15.9155 0 0 1 0 31.831
    //                             a 15.9155 15.9155 0 0 1 0 -31.831"
    //                             transform="scale(-1, 1) translate(-36, 0)"   
    //                     />
    //                 </svg>
    //                 <div className="inner-circle">
    //                     <p className="percentage">{progress + '%'}</p>
    //                     <span>de votre <br/>objectif</span>
    //                 </div>
    //             </div>
    //         </div>
    //     </React.Fragment>
    // );

    return (
        <ResponsiveContainer>
            <h2 id='progressTitle'>Score</h2>
            <PieChart>
                <Pie 
                    data={progress}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={90}
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
                    innerRadius={85}
                    outerRadius={95}
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