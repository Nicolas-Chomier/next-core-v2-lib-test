import { create } from 'zustand';
import { createDarkModeStore, DarkMode } from './darkModeStore';
import { createFishSlice, FishSlice } from './fishSlice';

export const useBoundStore = create<DarkMode & FishSlice>()((...a) => ({
	...createDarkModeStore(...a),
	...createFishSlice(...a),
}));
