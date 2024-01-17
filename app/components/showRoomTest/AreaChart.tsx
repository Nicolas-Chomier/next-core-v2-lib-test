// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import { AreaChart, ResponsiveContainer, Area } from 'recharts';
import './AreaChart.css';

type TAreaChartExProps = {
	newData: {
		timeStamp: number;
		convergence: number;
		flux: number;
		saturation: number;
	};
	label: string;
	sampling: number;
};

export const AreaChartEx: React.FC<TAreaChartExProps> = ({
	newData,
	label,
	sampling,
}: any) => {
	const [values, setValues] = useState<
		{
			timeStamp: number;
			convergence: number;
			flux: number;
			saturation: number;
		}[]
	>([]);

	useEffect(() => {
		setValues((prev) => {
			let updatedData = [...prev, newData];
			if (updatedData.length > 10) {
				updatedData.shift();
			}
			return updatedData;
		});
	}, [newData]);

	return (
		<div className={'area-chart-container'}>
			<div className='area-chart-title-wrapper'>
				<div className='area-chart-title'>{label}</div>
			</div>

			<ResponsiveContainer width={'110%'} height={'80%'}>
				<AreaChart
					data={values}
					margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient
							id='AreaChartColor1'
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop
								offset='0%'
								stopColor='rgb(219, 39, 119)'
								stopOpacity={1}
							/>
							<stop
								offset='100%'
								stopColor='rgb(192, 38, 211)'
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient
							id='AreaChartcolor2'
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop
								offset='0%'
								stopColor='rgb(253, 186, 116)'
								stopOpacity={1}
							/>
							<stop
								offset='100%'
								stopColor='rgb(253, 186, 116)'
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient
							id='AreaChartcolor3'
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop
								offset='0%'
								stopColor='rgb(153, 246, 228)'
								stopOpacity={0}
							/>
							<stop
								offset='100%'
								stopColor='rgb(217, 249, 157)'
								stopOpacity={1}
							/>
						</linearGradient>
					</defs>
					<Area
						type='monotone'
						dataKey='convergence'
						stroke='rgb(219, 39, 119)'
						strokeWidth={2}
						fillOpacity={1}
						fill='url(#AreaChartColor1)'
						animationEasing={'ease'}
						animationDuration={sampling}
						isAnimationActive={true}
					/>
					<Area
						type='monotone'
						dataKey='flux'
						stroke='#ffc180'
						strokeWidth={2}
						fillOpacity={1}
						fill='url(#AreaChartcolor2)'
						animationEasing={'ease'}
						animationDuration={sampling}
						isAnimationActive={true}
					/>
					<Area
						type='monotone'
						dataKey='saturation'
						stroke='rgb(217, 249, 157)'
						strokeWidth={2}
						fillOpacity={1}
						fill='url(#AreaChartcolor3)'
						animationEasing={'ease'}
						animationDuration={sampling}
						isAnimationActive={true}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};
