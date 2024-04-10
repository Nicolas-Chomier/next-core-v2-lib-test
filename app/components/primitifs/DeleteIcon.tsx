// React core
import React from 'react';
// External modules / Third-party libraries
import { Eraser } from 'lucide-react';
// Local components
// Hooks and utilities
// Configuration
// Styles
import styles from './DeleteIcon.module.css';

export const DeleteIcon: React.FC = () => {
	return <Eraser className={styles.deleteIcon} strokeWidth={1.6} />;
};
