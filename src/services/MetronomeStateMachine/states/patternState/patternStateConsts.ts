import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { TGetStateMenuDisplayFunc } from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";

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
