import { FC, useCallback } from "react";
import { SoundPlayer } from "@components/atoms/SoundPlayer/SoundPlayer";
import {
	DEFAULT_SOUND,
	getCurrentStepType,
	getSoundVolume,
} from "@components/molecules/TickAudio/TickAudioConsts";
import { MetronomeStateMachineContext } from "@context/MetronomeMachineContext/MetronomeMachineContext";
import { useSelector } from "@xstate/react";
import {
	selectCurrentStep,
	selectPattern,
} from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
import { ITickAudioProps } from "@components/molecules/TickAudio/TickAudioInterfaces";

export const TickAudio: FC<ITickAudioProps> = () => {
	const metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
	const currentStepIndex = useSelector(
		metronomeMachineRef,
		selectCurrentStep,
	);
	const pattern = useSelector(metronomeMachineRef, selectPattern);

	const getAudioFile = useCallback<() => string>(() => {
		return DEFAULT_SOUND;
	}, []);

	const getVolume = useCallback<() => number>(() => {
		return getSoundVolume(getCurrentStepType(pattern, currentStepIndex));
	}, [currentStepIndex, pattern]);

	return (
		<SoundPlayer
			getAudioFile={getAudioFile}
			getVolume={getVolume}
			trigger={currentStepIndex}
		/>
	);
};
