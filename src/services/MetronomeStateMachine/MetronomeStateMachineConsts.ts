import { DEFAULT_TEMPO, MAX_TEMPO, MIN_TEMPO } from "@config/MetronomeConfig";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { IMetronomeContext } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export const INIT_METRONOME_STATE: IMetronomeContext = {
	tempo: DEFAULT_TEMPO,
	pattern: [EStep.HIGH, EStep.LOW, EStep.LOW, EStep.LOW],
	displayText: DEFAULT_TEMPO.toString(),
	isPlaying: false,
};

export const getUpdatedTempo = (
	tempo: number,
	tempoIncrement: number,
): number => {
	const newTempo = tempo + tempoIncrement;
	console.log("new tempo", newTempo);
	if (newTempo > MAX_TEMPO) {
		return MAX_TEMPO;
	} else if (newTempo < MIN_TEMPO) {
		return MIN_TEMPO;
	} else {
		return newTempo;
	}
};
