import { DEFAULT_TEMPO } from "@config/metronomeConfig";

export const SET_TEMPO_DEBOUNCE_TIMEOUT = 200;

export const DEFAULT_TIMER_CONTEXT = {
	tempo: DEFAULT_TEMPO,
	metronomeStateMachine: null,
};
