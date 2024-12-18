import {
	DEFAULT_TEMPO,
	E_DISPLAY_BLINKING_DELAYS,
} from "@config/MetronomeConfig";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { IMetronomeContext } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { tempoState } from "@services/MetronomeStateMachine/states/tempoState/tempoState";

export const INIT_METRONOME_STATE: IMetronomeContext = {
	tempo: DEFAULT_TEMPO,
	pattern: [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW],
	isPlaying: false,
	lastState: "tempoState",
	tickTrigger: false,
	display: {
		text: DEFAULT_TEMPO.toString(),
		blinkingChars: [],
		blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG,
	},
};
