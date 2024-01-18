// React core
import React, { useEffect, useState } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import './PieChart.css';

type TPieChartExProps = {
	value: number;
	sampling: number;
	color: { gradient: string[]; backGround: string };
	label: string;
	id: string;
};

export const PieChartEx: React.FC<TPieChartExProps> = ({
	value,
	sampling,
	color,
	label,
	id,
}) => {
	const linearGradientColor1 = color.gradient[0];
	const linearGradientColor2 = color.gradient[1];
	//const neutralColor = color.backGround;
	const pieColor = [`url(#colorUv-${id})`, 'transparent'];

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

	return (
		<div className={'pie-chart-container glass-effect  '}>
			{/* picture-effect */}
			<LabelBox
				colorOne={linearGradientColor1}
				colorTwo={linearGradientColor2}
				label={label}
			></LabelBox>
			<div className='pie-chart-value'>{`${value}%`}</div>
			<ResponsiveContainer
				width={'100%'}
				height={'100%'}
				style={{ marginTop: '26%' }}
			>
				<PieChart>
					<defs>
						<RenderGradient
							colorOne={linearGradientColor1}
							colorTwo={linearGradientColor2}
							id={id}
						></RenderGradient>
					</defs>
					<Pie
						dataKey='value'
						innerRadius={61}
						outerRadius={70}
						data={pieData}
						stroke={'transparent'}
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
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

type TRenderGradientProps = {
	colorOne: string;
	colorTwo: string;
	id: string;
};

const RenderGradient: React.FC<TRenderGradientProps> = ({
	colorOne,
	colorTwo,
	id,
}) => {
	return (
		<linearGradient id={`colorUv-${id}`} x1='0' y1='0' x2='0' y2='1'>
			<stop offset='20%' stopColor={colorOne} stopOpacity={1} />
			<stop offset='80%' stopColor={colorTwo} stopOpacity={1} />
		</linearGradient>
	);
};

type TLabelBoxProps = { colorOne: string; colorTwo: string; label: string };

const LabelBox: React.FC<TLabelBoxProps> = ({ colorOne, colorTwo, label }) => {
	return (
		<div className='pie-chart-label-box-wrapper'>
			<div
				className='pie-chart-globe'
				style={{
					background: `linear-gradient(to left, ${colorOne}, ${colorTwo})`,
				}}
			></div>
			<div className='pie-chart-title'>{label}</div>
		</div>
	);
};
