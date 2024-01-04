'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from './LinkBar.module.css';

export const LinkBar = () => {
	const pathname = usePathname();
	const pageName = pathname.split('/').at(-1);
	const pageNames = settings.PAGES_NAMES;

	if (pageNames && pageNames.length === 0) {
		return <div></div>;
	}

	return (
		<div className={styles.container}>
			{pageNames.map((page, index) => {
				const path = settings.LANDING_PAGE + '/' + page.folderName;

				return (
					<Link key={`p-${index}`} href={path}>
						<div
							className={`${
								page.folderName === pageName
									? styles.actual_page
									: ''
							} ${styles.items}`}
						>
							<p className={styles.text}>
								{capitalize(page.givenName)}
							</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
