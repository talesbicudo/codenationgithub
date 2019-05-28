import React from 'react';

import { ResponsiveBar } from '@nivo/bar';
function fnum(x) {
    if (isNaN(x)) return x;

    if (x < 9999) {
        return x;
    }

    if (x < 1000000) {
        return Math.round(x / 1000) + "K";
    }
    if (x < 10000000) {
        return (x / 1000000).toFixed(2) + "M";
    }

    if (x < 1000000000) {
        return Math.round((x / 1000000)) + "M";
    }

    if (x < 1000000000000) {
        return Math.round((x / 1000000000)) + "B";
    }

    return "1T+";
}

const Bars = ({ legend, ...props }) => (
    <ResponsiveBar
        {...props}
       keys={['Total']}
        indexBy={'item'}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={["#61B0CF"]}
        labelTextColor={{ from: 'color', modifiers: [['brighter', '3']] }}
        layout="horizontal" enableGridY={false} enableGridX={true}
        borderColor={{ from: 'color', modifiers: [['darker', '0.1']] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Repositórios",
            legendPosition: 'middle',
            legendOffset: 32,
            format: v => fnum(v)
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend,
            legendPosition: 'middle',
            legendOffset: -50
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive
        tooltip={({ indexValue, color }) => (
            <strong style={{ color }}>
                Detalhes: {legend} {indexValue}
            </strong>
        )}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
        onMouseEnter={(data, event) => {
            event.target.style.cursor = "pointer";
        }}
    />
)
export default Bars; 