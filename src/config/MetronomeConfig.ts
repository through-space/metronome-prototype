import sound1 from "@assets/sounds/ClosedHH_808.wav";
import sound2 from "@assets/sounds/hh.wav";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";

export const MIN_TEMPO = 20;
export const MAX_TEMPO = 320;
export const DEFAULT_TEMPO = 60;
export const DEFAULT_VOLUME = 0;

export const DEFAULT_PATTERN = [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW];

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
