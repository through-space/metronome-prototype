import { IMetronomeContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	DEFAULT_TEMPO,
	E_DISPLAY_BLINKING_DELAYS,
} from "@config/metronomeConfig";
import { EStep } from "@config/commonInterfaces";

export const INIT_METRONOME_STATE: IMetronomeContext = {
	tempo: DEFAULT_TEMPO,
	pattern: [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW],
	isPlaying: false,
	lastState: "tempoState",
	currentStep: -1,
	tickTrigger: false,
	display: {
		text: DEFAULT_TEMPO.toString(),
		blinkingChars: [],
		blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG,
	},
};

export const SINGLE_TIMER_MACHINE_ID = "SINGLE_TIMER_MACHINE_ID";
