import {
	IGetNextStateOptionIndexProps,
	IStateMenuContext,
	TGetStateMenuDisplayFunc,
} from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";
import {
	IKnobTurnEvent,
	IMetronomeContext,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getPatternDisplay } from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";
import { context } from "esbuild";
import { getTempoDisplay } from "@services/MetronomeStateMachine/states/tempoState/tempoStateConsts";

const stateMenuOptionsDisplayMap = new Map<string, TGetStateMenuDisplayFunc>([
	["tempoState", ({ context }) => getTempoDisplay(context.tempo)],
	["patternState", ({ context }) => getPatternDisplay(context.pattern)],
]);

export const getStateMenuDisplay = (
	stateName: string,
	context: IMetronomeContext,
): string => {
	if (!stateMenuOptionsDisplayMap.has(stateName)) {
		return "";
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
