import sound1 from "@assets/sounds/ClosedHH_808.wav";
import sound2 from "@assets/sounds/hh.wav";

import { EStep } from "@config/commonInterfaces";

export const MIN_TEMPO = 20;
export const MAX_TEMPO = 320;
export const DEFAULT_TEMPO = 60;
export const DEFAULT_VOLUME = 0;

export enum E_DISPLAY_BLINKING_DELAYS {
	LONG = 500,
	SHORT = 200,
}

export const DEFAULT_BLINKING_DELAY = E_DISPLAY_BLINKING_DELAYS.LONG;

export const DEFAULT_PATTERN = [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW];
