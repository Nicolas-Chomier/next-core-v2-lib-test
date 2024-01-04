export type TSettingsProps = {
	URL: Url;

	DEFAULT_USER:
		| {
				email: string;
				password: string;
		  }
		| undefined;

	DUMMY_USER_INFOS:
		| {
				id: number;
				email: string;
				name: string;
				password: string;
				rank: string;
		  }
		| undefined;
};

export type TGlobalSettings = {
	LANGUAGE: string;

	THEME_ACCENTCOLOR: ThemeAccentColor | undefined;
	THEME_GRAYCOLOR: ThemeGrayColor | undefined;
	THEME_PANELBACKGROUND: ThemePanelBackground | undefined;
	THEME_SCALING: ThemeScaling | undefined;

	LANDING_PAGE: string;
	AUTHENTICATION_PAGE_TITLE: string | undefined;

	ACCOUNT_MANAGEMENT_PAGE: string;
	ACCOUNT_MANAGEMENT_PAGE_TITLE: string | undefined;

	NAVIGATION_BAR_TITLE: string | undefined;

	USERS_CONFIG: {
		[key: string]: {
			color: string;
			removable: boolean;
			administrator: boolean;
		};
	};

	SMARTPHONE_BREAKPOINT: string;
	TABLET_BREAKPOINT: string;
	SMALL_LAPTOP_BREAKPOINT: string;

	DEFAULT_SIGN_OPTION: {
		expiresIn: string;
	};

	PAGES_NAMES: { folderName: string; givenName: string }[] | [];
	//
	API_ROUTES: { [key: string]: string };
	//
	DEFAULT_RANK: string;
	DEFAULT_ID_NUMBER: number;
	//!remove STANDARD_COLOR
	STANDARD_COLOR_SUCCESS: string;
	STANDARD_COLOR_WARNING: string;
	STANDARD_COLOR_DANGER: string;
	//!remove ICON
	ICON_SIZE_M: string;
	ICON_STROKE_M: string;
	//
	NATIVE_COMPONENT_PX_RADIUS: string;
};
