'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import { Map, Marker } from 'pigeon-maps';
// Local components
// Hooks and utilities
import useWindowSize from '@/app/hooks/useWindowSize';
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import {
	HEX_STANDARD_COLOR_SUCCESS,
	HEX_STANDARD_COLOR_DANGER,
} from '@/config/constantes';
// Styles
import styles from './PMap.module.css';

type TMapProps =
	| {
			id: number;
			name?: string | undefined;
			lat: number;
			lon: number;
	  }
	| undefined;

type TPMapProps = {
	coordinates: TMapProps[];
	title?: string | undefined;
	handleMapClick: React.Dispatch<React.SetStateAction<number | null>>;
};

const Paris: [number, number] = [48.866669, 2.333333];
const coefWidth = 0.75;
const coefHeight = 0.55;

export const PMap = ({
	coordinates,
	title = 'Grahal',
	handleMapClick,
}: TPMapProps) => {
	// Map size
	const { width, height } = useWindowSize();
	const [mapTitle, setMapTitle] = useState<string | undefined>(undefined);

	const handleClick = (index: number) => {
		if (index) {
			handleMapClick(index);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>{capitalize(mapTitle) || title}</div>
			<div className={styles.map}>
				<Map
					defaultCenter={Paris}
					defaultZoom={10}
					dprs={[1, 2]}
					width={width * coefWidth}
					height={height * coefHeight}
				>
					{coordinates.map((item, index) => {
						const lat = item?.lat;
						const lon = item?.lon;
						if (lat && lon) {
							const name = item?.name;
							const spot = (
								<Marker
									key={index}
									width={48}
									anchor={[lat, lon]}
									color={
										name
											? HEX_STANDARD_COLOR_SUCCESS
											: HEX_STANDARD_COLOR_DANGER
									}
									onClick={() => handleClick(index)}
									onMouseOver={() => {
										setMapTitle(name);
									}}
									onMouseOut={() => {
										setMapTitle(undefined);
									}}
								></Marker>
							);
							return spot;
						}
					})}
				</Map>
			</div>
		</div>
	);
};
