// React core
import React, { useEffect, useState } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import './PieChart.css';

type TPieChartExProps = {
	label: string;
	value: number;
	sampling: number;
	color: { gradient: string[]; backGround: string };
	id: string;
};

export const PieChartEx: React.FC<TPieChartExProps> = ({
	label,
	value,
	sampling,
	color,
	id,
}) => {
	const linearGradientColor1 = color.gradient[0];
	const linearGradientColor2 = color.gradient[1];
	const neutralColor = color.backGround;
	const pieColor = [`url(#colorUv-${id})`, neutralColor]; // 'url(#colorUv)',

	const [pieData, setPieData] = useState([
		{ name: 'Groupe A', value: 90 },
		{ name: 'Groupe B', value: 10 },
	]);
	useEffect(() => {
		const data = [
			{ name: 'Groupe A', value: 90 },
			{ name: 'Groupe B', value: 10 },
		];
		data[0].value = value;
		data[1].value = 100 - value;
		setPieData(data);
	}, [value]);

	const renderCustomizedLabel = ({ cx, cy }: any) => {
		return (
			<text
				x={cx}
				y={cy}
				fill='white'
				textAnchor='middle'
				dominantBaseline='central'
				style={{ fontSize: 30 }}
			>
				{`${value}%`}
			</text>
		);
	};

	return (
		<div className={'pie-chart-container'}>
			<div className='pie-chart-title-wrapper'>
				<div
					className='pie-chart-globe'
					style={{
						background: `linear-gradient(to left, ${linearGradientColor1}, ${linearGradientColor2})`,
					}}
				></div>
				<div className='pie-chart-title'>{label}</div>
				<div className='pie-chart-value'>{`${value}%`}</div>
			</div>

			<ResponsiveContainer width={'100%'} height={'100%'}>
				<PieChart>
					<defs>
						<linearGradient
							id={`colorUv-${id}`}
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop
								offset='20%'
								stopColor={linearGradientColor1}
								stopOpacity={1}
							/>
							<stop
								offset='80%'
								stopColor={linearGradientColor2}
								stopOpacity={1}
							/>
						</linearGradient>
					</defs>
					{/* <defs>
						<RenderGradient color={color} id={id}></RenderGradient>
					</defs> */}
					<Pie
						dataKey='value'
						innerRadius={'77%'}
						outerRadius={'90%'}
						data={pieData}
						stroke={neutralColor}
						paddingAngle={4}
						labelLine={false}
						isAnimationActive={true}
						animationDuration={sampling}
						animationEasing={'ease-in-out'}
					>
						{pieData.map((entry, number) => (
							<Cell
								key={`cell-${number}`}
								fill={pieColor[number]}
							/>
						))}
					</Pie>
					{/* Ajouter d'autres composants de graphique si nécessaire */}
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

const RenderGradient = ({ color, id }: any) => {
	const linearGradientColor1 = color.gradient[0];
	const linearGradientColor2 = color.gradient[1];

	return (
		<linearGradient id={`colorUv-${id}`} x1='0' y1='0' x2='0' y2='1'>
			<stop
				offset='20%'
				stopColor={linearGradientColor1}
				stopOpacity={1}
			/>
			<stop
				offset='80%'
				stopColor={linearGradientColor2}
				stopOpacity={1}
			/>
		</linearGradient>
	);
};
