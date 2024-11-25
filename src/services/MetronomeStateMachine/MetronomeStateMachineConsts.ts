import { DEFAULT_TEMPO } from "@config/MetronomeConfig";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { IMetronomeContext } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { tempoState } from "@services/MetronomeStateMachine/states/tempoState/tempoState";

export const INIT_METRONOME_STATE: IMetronomeContext = {
	tempo: DEFAULT_TEMPO,
	pattern: [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW],
	displayText: DEFAULT_TEMPO.toString(),
	isPlaying: false,
	lastState: "tempoState",
};
