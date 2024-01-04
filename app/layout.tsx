'use client';
// External modules / Third-party libraries
import { Theme } from '@radix-ui/themes';
import { AuthProvider } from '@/app/components/core/provider/AuthProvider';
// Hooks and utilities
import { useBoundStore } from './store/useBoundStore';
import QueryProvider from './components/core/provider/QueryProvider';
// Configuration
import settings from '@/settings/settings';
// Styles
import '@radix-ui/themes/styles.css';
import '@/app/styles/globals.css';
import '@/app/styles/backGround.css';
import '@/app/styles/variables.css';
import 'my-library/dist/style.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isDarkMode = useBoundStore((state) => state.isDarkMode);
	return (
		<html lang={settings.LANGUAGE} suppressHydrationWarning>
			<body
				className={`
				${isDarkMode ? 'dark-theme' : ''} 
				${isDarkMode ? 'dark_background' : 'light_background'}`}
			>
				<Theme
					appearance={isDarkMode ? 'dark' : 'light'}
					accentColor={settings.THEME_ACCENTCOLOR}
					grayColor={settings.THEME_GRAYCOLOR}
					panelBackground={settings.THEME_PANELBACKGROUND}
					scaling={settings.THEME_SCALING}
				>
					<AuthProvider>
						<QueryProvider>{children}</QueryProvider>
					</AuthProvider>
				</Theme>
			</body>
		</html>
	);
}
