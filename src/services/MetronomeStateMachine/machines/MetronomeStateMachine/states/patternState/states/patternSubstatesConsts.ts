import { IPatternStateContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { IKnobTurnEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { stepTypes } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/patternState/patternStateConsts";

import { EStep } from "@config/commonInterfaces";

export const getNewCharIndex = (
	context: IPatternStateContext,
	event: IKnobTurnEvent,
): number => {
	return Math.abs(
		(context.currentEditCharIndex + event.change) % context.pattern.length,
	);
};

export const getNextStep = (stepType: EStep, event: IKnobTurnEvent): EStep => {
	const stepTypeIndex = stepTypes.indexOf(stepType);
	return stepTypes[(stepTypeIndex + event.change) % stepTypes.length];
};
