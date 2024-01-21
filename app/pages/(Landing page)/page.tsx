'use client';
// React core
import React, { useEffect, useState } from 'react';
// External modules / Third-party libraries

// Local components
import { PieChartEx } from '@/app/components/showRoomTest/PieChart';
import { AreaChartEx } from '@/app/components/showRoomTest/AreaChart';
import { ShowRoomForm } from '@/app/components/showRoomTest/ShowRoomForm';
import { UserProfile } from '@/Library/UserProfile/UserProfile';
// Hooks and utilities

// Configuration
import settings from '@/settings/settings';
// Styles
import './LandingPage.css';
import { MagicCard } from '@/Library/MagicCard/MagicCard';

const IMGPATH = `/images/moi.jpg`;
//
const colorTheme1 = {
	gradient: ['rgb(192, 38, 211)', 'rgb(219, 39, 119)'],
	backGround: '#2b2b4b',
};
const colorTheme2 = {
	gradient: ['rgb(153, 246, 228)', 'rgb(217, 249, 157)'],
	backGround: '#2b2b4b',
};
const colorTheme3 = {
	gradient: ['rgb(59, 130, 246)', 'rgb(37, 99, 235)'],
	backGround: '#2b2b4b',
};
const colorTheme4 = {
	gradient: ['rgb(251, 113, 133)', 'rgb(253, 186, 116)'],
	backGround: '#2b2b4b',
};
const sampling = 1000;

const LandingPage = () => {
	const [areaChartData, setAreaChartData] = useState({
		timeStamp: 1,
		convergence: 3000,
		flux: 1398,
		saturation: 2210,
	});
	const [pieChartData, setPieChartData] = useState({
		pieChart1: 10,
		pieChart2: 80,
		pieChart3: 10,
		pieChart4: 10,
	});
	// Effect to
	useEffect(() => {
		let time = 0;
		const interval = setInterval(() => {
			time += 1;
			const newData = {
				timeStamp: time,
				convergence: getRandomNbs(0, 3000),
				flux: getRandomNbs(0, 3000),
				saturation: getRandomNbs(0, 3000),
			};

			setAreaChartData(newData);
		}, sampling);

		return () => clearInterval(interval);
	}, []);

	// Effect to
	useEffect(() => {
		const interval = setInterval(() => {
			const newPieData = {
				pieChart1: getRandomNbs(50, 100),
				pieChart2: getRandomNbs(40, 60),
				pieChart3: getRandomNbs(0, 100),
				pieChart4: getRandomNbs(20, 90),
			};
			setPieChartData(newPieData);
		}, sampling * 2);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='super-container'>
			<div className='container'>
				<MagicCard style={'background'} isShadow={false}>
					<ShowRoomForm></ShowRoomForm>
				</MagicCard>
			</div>

			{/* <div className='container pie-wrapper'>
				<PieChartEx
					label={'Superposition ε'}
					value={pieChartData.pieChart4}
					color={colorTheme4}
					sampling={sampling}
					id='pieChart4'
				/>
				<PieChartEx
					label={'Superposition α'}
					value={pieChartData.pieChart1}
					color={colorTheme1}
					sampling={sampling}
					id='pieChart1'
				/>
				<PieChartEx
					label={'Superposition β'}
					value={pieChartData.pieChart2}
					color={colorTheme2}
					sampling={sampling}
					id='pieChart2'
				/>
			</div>
			<div className='container area-chart'>
				<AreaChartEx
					newData={areaChartData}
					label='Courbe n°1'
					sampling={sampling}
					width='100%'
					height='100%'
				></AreaChartEx>
			</div> */}
		</div>
	);
};
export default LandingPage;

// Génère un nombre aléatoire entre x et y (inclus)
const getRandomNbs = (x: number, y: number): number => {
	return Math.floor(Math.random() * (y - x + 1)) + x;
};
