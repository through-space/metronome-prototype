import { IMetronomeMachineSnapshot } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export const selectIsPlaying = (snapshot: IMetronomeMachineSnapshot) => {
	return snapshot.context.isPlaying;
};

export const selectDisplayState = (snapshot: IMetronomeMachineSnapshot) => {
	return snapshot.context.display;
};

export const selectTickTrigger = (snapshot: IMetronomeMachineSnapshot) => {
	return snapshot.context.tickTrigger;
};

export const selectCurrentStep = (snapshot: IMetronomeMachineSnapshot) => {
	return snapshot.context.currentStep;
};

export const selectPattern = (snapshot: IMetronomeMachineSnapshot) => {
	return snapshot.context.pattern;
};
