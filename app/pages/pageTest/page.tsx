// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
// Configuration
import styles from './pageTest.module.css';
import { LoginTitle } from './components/title/LoginTitle';
import { LoginForm } from './components/form/LoginForm';
import { Frame } from '@/app/components/primitifs/Frame';

const LoginPage = () => {
	return (
		<div className={styles.container}>
			<div>
				<div>
					<LoginTitle />
				</div>
				<div>
					<LoginForm></LoginForm>
				</div>
				<div></div>
			</div>
		</div>
	);
};
export default LoginPage;
