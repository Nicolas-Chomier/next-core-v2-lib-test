export const globalSettings = {
	LANGUAGE: 'fr',

	THEME_ACCENTCOLOR: 'iris',
	THEME_GRAYCOLOR: 'sand',
	THEME_PANELBACKGROUND: 'translucent',
	THEME_SCALING: '95%',

	LANDING_PAGE: '/pages',
	get ACCOUNT_MANAGEMENT_PAGE() {
		return this.LANDING_PAGE + '/AccountManagement';
	},

	LANDING_PAGE_TITLE: '',
	ACCOUNT_MANAGEMENT_PAGE_TITLE: 'Paramètres',

	AUTHENTICATION_PAGE_TITLE: process.env.NEXT_PUBLIC_TITLE,
	NAVIGATION_BAR_TITLE: process.env.NEXT_PUBLIC_NAV_NAME,

	API_ROUTES: {
		GET_ALL_USER: `/api/admin/getAllUser`,
		DELETE_USER_ID: `/api/admin/deleteUser`,
		ADD_USER: `/api/admin/addUser`,
		CHANGE_PASSWORD: `/api/admin/changePassword`,
	},

	DEFAULT_SIGN_OPTION: {
		expiresIn: '9h',
	},

	ODB_CONFIG: {
		user: process.env.DATABASE_ORACLE_USER,
		password: process.env.DATABASE_ORACLE_PASSWORD,
		connectString: process.env.DATABASE_ORACLE_CONNECTSTRING,
	},

	DATEFORMAT: 'dd/MM/yyyy',
	MINIMUM_ALLOWED_DATE: new Date('01/01/2022'),

	PAGES_NAMES: [
		//{ folderName: 'page_0', givenName: '0' },
		//{ folderName: 'page_1', givenName: '0' },
		//{ folderName: 'page_2', givenName: '0' },
	],

	USERS_CONFIG: {
		master: { color: 'red', removable: false, administrator: true },
		admin: { color: 'orange', removable: true, administrator: true },
		worker: { color: 'purple', removable: true, administrator: false },
		user: { color: 'blue', removable: true, administrator: false },
		guest: { color: 'green', removable: true, administrator: false },
	},

	DEFAULT_RANK: 'guest',
	DEFAULT_ID_NUMBER: 9999,

	SMARTPHONE_BREAKPOINT: '(min-width: 100px) and (max-width: 480px)',
	TABLET_BREAKPOINT: '(min-width: 481px) and (max-width: 1023px)',
	SMALL_LAPTOP_BREAKPOINT: '(min-width: 1024px)',
	//* NATIVE_COMPONENT
	NATIVE_COMPONENT_RADIUS: 'full',
	NATIVE_COMPONENT_PX_RADIUS: '9px',
	NATIVE_COMPONENT_VARIANT: 'solid',
	NATIVE_COMPONENT_ACCENTCOLOR: 'iris',
	//* STANDARD_COLOR
	STANDARD_COLOR_SUCCESS: 'grass',
	STANDARD_COLOR_WARNING: 'amber',
	STANDARD_COLOR_DANGER: 'tomato',
	//* ICON
	ICON_SIZE_M: '20',
	ICON_STROKE_M: '1.6',
};
