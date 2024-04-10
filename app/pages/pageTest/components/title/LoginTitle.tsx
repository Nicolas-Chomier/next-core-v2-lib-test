// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './LoginTitle.module.css';

export const LoginTitle: React.FC = () => {
	return (
		<div className={`${styles.container}`}>
			<h1>Log In</h1>
		</div>
	);
};
