// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { UserInfos } from '@/app/components/core/navigation/userInfos/UserInfos';
import { MultiButtonFrame } from '@/app/components/core/navigation/settingsButtonMenu/SettingsButtonMenu';
import { LinkButton } from '@/app/components/core/navigation/linkButtonMenu/LinkButtonMenu';
import { Title } from '@/app/components/core/navigation/title/Title';
// Hooks and utilities
import useMediaQuery from '@/app/hooks/useMediaQuery';
// Configuration
import { MEDIAQUERY_BREAKPOINT_SMARTPHONE } from '@/config/constantes';
// Styles
import styles from './TinyBar.module.css';

type TTinyBarProps = {};

export const TinyBar = ({}: TTinyBarProps) => {
	const isSmartphoneSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_SMARTPHONE);

	return (
		<div className={styles.container}>
			{!isSmartphoneSize && (
				<div className={styles.title}>
					<Title />
				</div>
			)}

			<div
				className={`${styles.tinyBar_wrapper} ${
					!isSmartphoneSize && styles.tinyBar_wrapper_smartphone
				}`}
			>
				<MultiButtonFrame />
				<UserInfos />
				<LinkButton />
			</div>
		</div>
	);
};
