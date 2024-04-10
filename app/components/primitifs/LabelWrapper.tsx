// React core
import React, { ReactNode } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './labelWrapper.module.css';

type InputLabelProps = {
	label?: string;
	children?: ReactNode;
	labelPosition: 'start' | 'center';
};

export const LabelWrapper: React.FC<InputLabelProps> = ({
	label,
	children,
	labelPosition = 'start',
}) => {
	return (
		<div className={styles.labelWrapper} data-labelposition={labelPosition}>
			{label ? <span>{label}</span> : null}
			{children}
		</div>
	);
};
