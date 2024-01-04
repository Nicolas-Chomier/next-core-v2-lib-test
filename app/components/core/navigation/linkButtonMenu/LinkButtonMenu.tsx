'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import settings from '@/settings/settings';
// Styles
import styles from './LinkButtonMenu.module.css';
//!remove settings conf to put in css variables
export const LinkButton = () => {
	const [showMenu, setShowMenu] = useState(false);
	const pageNames = settings.PAGES_NAMES;

	const toggleMenu = () => setShowMenu(!showMenu);
	const menuIcon = showMenu ? (
		<X
			size={settings.ICON_SIZE_M}
			strokeWidth={settings.ICON_STROKE_M}
			color={settings.STANDARD_COLOR_DANGER}
			className={styles.icon_x}
		/>
	) : (
		<Menu
			size={settings.ICON_SIZE_M}
			strokeWidth={settings.ICON_STROKE_M}
			className={styles.icon_menu}
		/>
	);

	return (
		<div className={styles.multiButtonFrame}>
			<button
				className={` ${styles.switch_base} ${styles.toggle_switch}`}
				onClick={toggleMenu}
			>
				{menuIcon}
			</button>
			<div
				className={`${
					showMenu ? styles.showButton : styles.hiddenButton
				}`}
			>
				{pageNames.map((page) => (
					<div key={page.folderName} className={styles.button_shape}>
						<Link
							href={`${settings.LANDING_PAGE}/${page.folderName}`}
							className={styles.link_button}
						>
							<p className={styles.text}>
								{capitalize(page.givenName)}
							</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
