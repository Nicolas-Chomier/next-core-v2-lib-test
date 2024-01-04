'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import {
	HomeIcon,
	LogOut,
	Moon,
	Settings,
	Settings2,
	Sun,
	X,
} from 'lucide-react';
import { Tooltip } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/app/store/useBoundStore';
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from './SettingsButtonMenu.module.css';
//! remove icon settings
export const MultiButtonFrame = () => {
	// Store
	const isDarkMode = useBoundStore((state) => state.isDarkMode);
	const toggleDarkMode = useBoundStore((state) => state.toggleDarkMode);
	// Setup
	const router = useRouter();
	const [isMenuVisible, setMenuVisibility] = useState(false);

	const darkModeIcon = () => {
		return isDarkMode ? (
			<Sun
				size={settings.ICON_SIZE_M}
				strokeWidth={settings.ICON_STROKE_M}
			/>
		) : (
			<Moon
				size={settings.ICON_SIZE_M}
				strokeWidth={settings.ICON_STROKE_M}
			/>
		);
	};

	const tooltipMessage = isDarkMode ? 'Light Mode' : 'Dark Mode';

	return (
		<div className={styles.multiButtonFrame}>
			<button
				className={` ${styles.switch_base} ${styles.toggle_switch}`}
				onClick={() => setMenuVisibility(!isMenuVisible)}
			>
				{isMenuVisible ? (
					<X
						size={settings.ICON_SIZE_M}
						strokeWidth={settings.ICON_STROKE_M}
						color={settings.STANDARD_COLOR_DANGER}
					/>
				) : (
					<Settings2
						size={settings.ICON_SIZE_M}
						strokeWidth={settings.ICON_STROKE_M}
					/>
				)}
			</button>
			<div
				className={`${
					isMenuVisible ? styles.showButton : styles.hiddenButton
				}`}
			>
				<div className={styles.button1}>
					<SettingSubSwitch
						handleClick={() => {
							toggleDarkMode(), setMenuVisibility(false);
						}}
						toolTip={tooltipMessage}
					>
						{darkModeIcon()}
					</SettingSubSwitch>
				</div>

				<div className={styles.button2}>
					<SettingSubSwitch
						handleClick={() => signOut({ callbackUrl: '/' })}
						toolTip={'Paramètres'}
					>
						<LogOut
							size={settings.ICON_SIZE_M}
							strokeWidth={settings.ICON_STROKE_M}
						/>
					</SettingSubSwitch>
				</div>

				<div className={styles.button3}>
					<SettingSubSwitch
						handleClick={() => {
							router.push(settings.LANDING_PAGE),
								setMenuVisibility(false);
						}}
						toolTip={'Paramètres'}
					>
						<HomeIcon
							size={settings.ICON_SIZE_M}
							strokeWidth={settings.ICON_STROKE_M}
						/>
					</SettingSubSwitch>
				</div>

				<div className={styles.button4}>
					<SettingSubSwitch
						handleClick={() => {
							router.push(settings.ACCOUNT_MANAGEMENT_PAGE),
								setMenuVisibility(false);
						}}
						toolTip={'Paramètres'}
					>
						<Settings
							size={settings.ICON_SIZE_M}
							strokeWidth={settings.ICON_STROKE_M}
						/>
					</SettingSubSwitch>
				</div>
			</div>
		</div>
	);
};

type TSettingSubSwitchProps = {
	handleClick: () => void;
	toolTip?: string | undefined;
	children: React.ReactNode;
};
const SettingSubSwitch = ({
	handleClick,
	toolTip,
	children,
}: TSettingSubSwitchProps) => {
	return (
		<Tooltip content={toolTip || '...'}>
			<button
				onClick={handleClick}
				className={`${styles.switch_base} ${styles.sub_switch}`}
			>
				{children}
			</button>
		</Tooltip>
	);
};
