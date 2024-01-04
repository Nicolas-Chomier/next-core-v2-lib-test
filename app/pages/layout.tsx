'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { NavigationBar } from '@/app/components/core/navigation/navigationBar/NavigationBar';
// Hooks and utilities
// Configuration
// Font
import { Plus_Jakarta_Sans } from 'next/font/google';

const customFont = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: '400',
	style: ['normal'],
});

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className={customFont.className}>
			<NavigationBar />
			<div>{children}</div>
		</main>
	);
};
export default LandingLayout;
