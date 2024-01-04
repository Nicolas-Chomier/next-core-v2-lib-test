export const padString = (item: string): string | undefined => {
	if (!item) {
		return undefined;
	}
	// Settings
	const maxSize = 13;
	if (item.length < maxSize) {
		return item;
	}

	return item.slice(0, 10).padEnd(maxSize, '.');
};
