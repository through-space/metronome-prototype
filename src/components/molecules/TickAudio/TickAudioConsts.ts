import { EStep } from "@config/commonInterfaces";
import { DEFAULT_VOLUME } from "@config/metronomeConfig";
import sound1 from "@assets/sounds/ClosedHH_808.wav";
import sound2 from "@assets/sounds/hh.wav";

const SOUND_MAP: Record<string, string> = {
	sound1: sound1,
	sound2: sound2,
};

export const DEFAULT_SOUND_FILE = "sound1";

export const DEFAULT_SOUND = SOUND_MAP[DEFAULT_SOUND_FILE];

export const CLICK_VOLUMES_MAP: Record<EStep, number> = {
	[EStep.PAUSE]: 0,
	[EStep.LOW]: 0.3,
	[EStep.HIGH]: 0.8,
};

export const getSoundVolume = (step: EStep) => {
	return step in CLICK_VOLUMES_MAP ? CLICK_VOLUMES_MAP[step] : DEFAULT_VOLUME;
};

export const getCurrentStepType = (
	pattern: EStep[],
	stepIndex: number,
): EStep => {
	return pattern?.[stepIndex];
};
