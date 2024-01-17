'use client';
// React core
import React, { useEffect, useState } from 'react';
// External modules / Third-party libraries

// Local components

// Hooks and utilities

// Configuration
import './LandingPage.css';
import { PieChartEx } from '@/app/components/showRoomTest/PieChart';
import { AreaChartEx } from '@/app/components/showRoomTest/AreaChart';

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
const sampling = 500;

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
				convergence: getRandomNbs(200, 9000),
				flux: getRandomNbs(-4200, 5800),
				saturation: getRandomNbs(-200, -9000),
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
		<div className='container'>
			<div className='user-infos'></div>
			<div className='products-infos '>
				<div className='products-n1'></div>
				<div className='products-n2'></div>
				<div className='products-n3'></div>
				<div className='products-n4'></div>
			</div>
			<div className='side-bar '></div>
			<div className='graph-1 border-effect'>
				<PieChartEx
					label={'Taux de superposition α'}
					value={pieChartData.pieChart1}
					color={colorTheme1}
					sampling={sampling}
					id='pieChart1'
				/>
				<PieChartEx
					label={'Taux de superposition β'}
					value={pieChartData.pieChart2}
					color={colorTheme2}
					sampling={sampling}
					id='pieChart2'
				/>
			</div>

			<div className='graph-2 border-effect'>
				<PieChartEx
					label={'Taux de superposition G1'}
					value={pieChartData.pieChart3}
					color={colorTheme3}
					sampling={sampling}
					id='pieChart3'
				/>
				<PieChartEx
					label={'Taux de superposition G2'}
					value={pieChartData.pieChart4}
					color={colorTheme4}
					sampling={sampling}
					id='pieChart4'
				/>
			</div>

			<div className='table border-effect'>
				<AreaChartEx
					newData={areaChartData}
					label='Convergence super-critique'
					sampling={sampling}
				></AreaChartEx>
				d
			</div>
		</div>
	);
};
export default LandingPage;

// Génère un nombre aléatoire entre x et y (inclus)
const getRandomNbs = (x: number, y: number): number => {
	return Math.floor(Math.random() * (y - x + 1)) + x;
};
