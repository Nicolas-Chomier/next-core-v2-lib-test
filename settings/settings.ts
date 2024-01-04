import { developmentSettings } from '@/settings/settings.development';
import { productionSettings } from '@/settings/settings.production';
import { globalSettings } from '@/settings/settings.global';
import { TSettingsProps, TGlobalSettings } from '@/settings/settings.type';

let configuration: TSettingsProps & TGlobalSettings;

const env = process.env.NODE_ENV;

if (env === 'production') {
	configuration = { ...productionSettings, ...globalSettings };
} else {
	configuration = { ...developmentSettings, ...globalSettings };
}

export default configuration;
