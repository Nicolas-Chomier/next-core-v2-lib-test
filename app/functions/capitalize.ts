export const capitalize = (str: string | undefined | null) => {
	if (!str) return null;
	return str.charAt(0).toUpperCase() + str.slice(1);
};
