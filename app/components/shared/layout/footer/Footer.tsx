// React core
import React from 'react';
// External modules / Third-party libraries
import { Badge } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { usePathname } from 'next/navigation';
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from './Footer.module.css';

export const Footer = () => {
	const pathname = usePathname();
	const pageName = pathname.split('/').at(-1);

	return (
		<Badge
			radius={'full'}
			variant={'solid'}
			className={styles.footer}
		>{`/${pageName}`}</Badge>
	);
};
