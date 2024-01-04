// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './Header.module.css';

type THeaderProps = {
	children: React.ReactNode;
};

export const Header = ({ children }: THeaderProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>{children}</div>
		</div>
	);
};
