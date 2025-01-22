import { MAX_TEMPO, MIN_TEMPO } from "@config/metronomeConfig";
import { TGetStateMenuDisplayFunc } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";

export const getUpdatedTempo = (
	tempo: number,
	tempoIncrement: number,
): number => {
	const newTempo = tempo + tempoIncrement;
	if (newTempo > MAX_TEMPO) {
		return MAX_TEMPO;
	} else if (newTempo < MIN_TEMPO) {
		return MIN_TEMPO;
	} else {
		return newTempo;
	}
};

export const getTempoDisplay: TGetStateMenuDisplayFunc = ({ context }) => {
	return {
		value: context.tempo.toString(),
	};
};
