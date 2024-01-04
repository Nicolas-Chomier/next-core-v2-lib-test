// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
import { NATIVE_COMPONENT_PX_RADIUS } from '@/config/constantes';
// Styles
import styles from './CustomCard.module.css';

type CustomCardProps = {
	children: React.ReactNode;
};

export const CustomCard = (props: CustomCardProps) => {
	return (
		<div
			className={styles.CustomCard}
			style={{ borderRadius: NATIVE_COMPONENT_PX_RADIUS }}
		>
			{props.children}
		</div>
	);
};
