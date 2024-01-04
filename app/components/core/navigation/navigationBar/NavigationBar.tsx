// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { UserInfos } from '@/app/components/core/navigation/userInfos/UserInfos';
import { MultiButtonFrame } from '@/app/components/core/navigation/settingsButtonMenu/SettingsButtonMenu';
import { LinkBar } from '@/app/components/core/navigation/linkBar/LinkBar';
import { LinkButton } from '@/app/components/core/navigation/linkButtonMenu/LinkButtonMenu';
import { Title } from '@/app/components/core/navigation/title/Title';
// Hooks and utilities
import useMediaQuery from '@/app/hooks/useMediaQuery';
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
	const isSmartphoneSize = useMediaQuery(settings.SMARTPHONE_BREAKPOINT);
	const isTabletSize = useMediaQuery(settings.TABLET_BREAKPOINT);
	const isLaptopSize = useMediaQuery(settings.SMALL_LAPTOP_BREAKPOINT);

	return (
		<div className={styles.container}>
			{!isSmartphoneSize && (
				<div className={styles.link_bar_wrapper}>
					<LinkBar />
				</div>
			)}

			<div className={styles.navigation_element_wrapper}>
				{isLaptopSize && <Title />}

				{(isSmartphoneSize || isTabletSize) && <MultiButtonFrame />}
				{isSmartphoneSize && <LinkButton />}
				{isTabletSize && <UserInfos />}

				{isLaptopSize && (
					<div className={styles.navigation_element_sub_part}>
						<UserInfos />
						<MultiButtonFrame />
					</div>
				)}
			</div>
		</div>
	);
};
