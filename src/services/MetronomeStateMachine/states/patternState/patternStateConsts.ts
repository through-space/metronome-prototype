import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { TGetStateMenuDisplayFunc } from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";

const EMPTY_CHAR = " ";

export const patternCharMap = new Map<EStep, string>([
	[EStep.HIGH, "*"],
	[EStep.LOW, "o"],
	[EStep.PAUSE, "_"],
]);

export const stepTypes = Array.from(patternCharMap.keys());

export const getDisplayChar = (step: EStep) => {
	return patternCharMap.has(step) ? patternCharMap.get(step) : EMPTY_CHAR;
};

export const getPatternDisplay: TGetStateMenuDisplayFunc = ({ context }) => {
	return {
		value: context.pattern.map((step) => getDisplayChar(step)).join(""),
		blinkingChars: [0],
	};
};
