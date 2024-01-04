import { StateCreator } from 'zustand';

export interface DarkMode {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

export const createDarkModeStore: StateCreator<DarkMode> = (set) => ({
	isDarkMode: false,
	toggleDarkMode: () =>
		set((state) => ({
			isDarkMode: !state.isDarkMode,
		})),
});
