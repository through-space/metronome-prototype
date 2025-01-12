import { IMetronomeMachineSnapshot } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export const selectIsPlaying = (snapshot: IMetronomeMachineSnapshot) => {
	return snapshot.context.isPlaying;
};
