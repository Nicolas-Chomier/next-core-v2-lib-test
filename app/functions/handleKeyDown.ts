const forbiddenKeysForNumber: string[] = [
	'+',
	'-',
	'e',
	'%',
	'$',
	'*',
	';',
	'&',
];
const forbiddenKeysForText: string[] = [
	'*',
	'+',
	'-',
	'<',
	'>',
	'%',
	'=',
	'/',
	';',
	'&',
	'#',
];
const forbiddenKeysForEmail: string[] = [
	'*',
	'+',
	'-',
	'<',
	'>',
	'%',
	'=',
	'/',
	';',
	'&',
];
const forbiddenKeysForPassword: string[] = [
	'*',
	'+',
	'-',
	'<',
	'>',
	'%',
	'=',
	'/',
	';',
	'&',
];

export const handleKeyDown = (event: React.KeyboardEvent, type: string) => {
	let dictionnary: string[] = [];

	switch (type) {
		case 'number':
			dictionnary = forbiddenKeysForNumber;
			break;
		case 'text':
			dictionnary = forbiddenKeysForText;
			break;
		case 'email':
			dictionnary = forbiddenKeysForEmail;
			break;
		case 'password':
			dictionnary = forbiddenKeysForPassword;
			break;
		default:
			dictionnary = forbiddenKeysForText;
			break;
	}

	if (dictionnary.includes(event.key.toLowerCase())) {
		event.preventDefault();
	}
	return;
};
