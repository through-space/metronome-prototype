import {
	IGetNextStateOptionIndexProps,
	TGetStateMenuDisplayFunc,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";
import { IMetronomeContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getPatternDisplay } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateConsts";
import { getTempoDisplay } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/tempoState/tempoStateConsts";

const stateMenuOptionsDisplayMap = new Map<string, TGetStateMenuDisplayFunc>([
	["tempoState", ({ context }) => getTempoDisplay({ context })],
	["patternState", ({ context }) => getPatternDisplay({ context })],
]);

export const getStateMenuDisplay = (
	stateName: string,
	context: IMetronomeContext,
): { value: string } => {
	if (!stateMenuOptionsDisplayMap.has(stateName)) {
		return { value: "" };
	}

	return stateMenuOptionsDisplayMap.get(stateName)({ context });
};

export const getAllStateOptions = (): string[] =>
	Array.from(stateMenuOptionsDisplayMap.keys());

export const getNextStateOptionIndex = ({
	currentMenuOptionIndex,
	allStates,
	lastState,
	turnValue,
}: IGetNextStateOptionIndexProps) => {
	const currentStateIndex =
		currentMenuOptionIndex === undefined
			? allStates.indexOf(lastState)
			: currentMenuOptionIndex;

	return Math.abs(currentStateIndex + turnValue) % allStates.length;
};
