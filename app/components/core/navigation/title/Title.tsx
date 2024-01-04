// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Text } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from './Title.module.css';

export const Title = () => {
	const title = settings?.NAVIGATION_BAR_TITLE || '';
	return (
		<Link href={settings.LANDING_PAGE}>
			<Text as='p' className={styles.title}>
				{capitalize(title)}
			</Text>
		</Link>
	);
};
