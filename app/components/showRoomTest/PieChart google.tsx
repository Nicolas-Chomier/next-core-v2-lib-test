// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration

import { Chart } from 'react-google-charts';

export const data = [
	['Task', 'Hours per Day'],
	['', 11],
	['', 2],
];

export const options = {
	pieHole: 0.85,
	is3D: false,
	legend: 'none',
	pieSliceText: 'none',
	backgroundColor: 'transparent',
	pieSliceBorderColor: 'transparent',
	colors: ['#e0440e', '#f3b49f', '#f6c7b6'],
	chartArea: {
		left: '10%',
		right: '10%',
		top: '10%',
		bottom: '10%', // Vous pouvez utiliser des valeurs en pourcentage ou des valeurs fixes en pixels
		// Vous pouvez également définir top, width, et height si nécessaire
	},
};

export const PieChartEx: React.FC = () => {
	return (
		<Chart
			chartType='PieChart'
			width='50%'
			height='50%'
			data={data}
			options={options}
		/>
	);
};
