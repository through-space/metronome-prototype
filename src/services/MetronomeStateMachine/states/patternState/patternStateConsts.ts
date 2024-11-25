import { EStep } from "@hooks/useTimer/useTimerInterfaces";

const EMPTY_CHAR = " ";

const patternCharMap = new Map<EStep, string>([
	[EStep.HIGH, "*"],
	[EStep.LOW, "o"],
	[EStep.PAUSE, "_"],
]);

export const getPatternDisplay = (pattern: EStep[]): string => {
	return pattern
		.map((step) =>
			patternCharMap.has(step) ? patternCharMap.get(step) : EMPTY_CHAR,
		)
		.join("");
};
