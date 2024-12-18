import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { IKnobTurnEvent } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { stepTypes } from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";

export const getNewCharIndex = (
	context: IPatternStateContext,
	event: IKnobTurnEvent,
): number => {
	return Math.abs(
		(context.currentEditCharIndex + event.value) % context.pattern.length,
	);
};

export const getNextStep = (stepType: EStep, event: IKnobTurnEvent): EStep => {
	const stepTypeIndex = stepTypes.indexOf(stepType);
	return stepTypes[(stepTypeIndex + event.value) % stepTypes.length];
};
