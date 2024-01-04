// React core
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './LoadingSpinner.module.css';

type TLoadingSpinnerProps = {
	color?: 'white' | 'black' | undefined;
};

export const LoadingSpinner = ({ color = undefined }: TLoadingSpinnerProps) => {
	return (
		<span
			className={` ${
				color && color === 'white' && styles.spinner_white
			} ${color && color === 'black' && styles.spinner_black} ${
				styles.spinner
			}`}
		></span>
	);
};
