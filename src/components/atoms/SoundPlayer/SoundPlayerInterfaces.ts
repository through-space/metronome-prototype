export interface ISoundPlayerProps {
	getAudioFile: () => string;
	getVolume: () => number;
	trigger: boolean | number;
}
