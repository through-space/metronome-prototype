import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import {
	IStateMenuContext,
	TGetStateMenuDisplayFunc,
} from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { IKnobTurnEvent } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";

const EMPTY_CHAR = " ";

const patternCharMap = new Map<EStep, string>([
	[EStep.HIGH, "*"],
	[EStep.LOW, "o"],
	[EStep.PAUSE, "_"],
]);

export const getPatternDisplay: TGetStateMenuDisplayFunc = ({ context }) => {
	return {
		value: context.pattern
			.map((step) =>
				patternCharMap.has(step)
					? patternCharMap.get(step)
					: EMPTY_CHAR,
			)
			.join(""),
		blinkingChars: [0],
	};
};

export const getNewCharIndex = (
	context: IPatternStateContext,
	event: IKnobTurnEvent,
): number => {
	return Math.abs(
		(context.currentEditCharIndex + event.value) % context.pattern.length,
	);
};
