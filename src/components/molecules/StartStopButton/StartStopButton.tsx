import React, { FC } from "react";
import { SimpleButton } from "@components/atoms/SimpleButton/SimpleButton";
import { MetronomeStateMachineContext } from "../../../context/MetronomeMachineContext/MetronomeMachineContext";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { useSelector } from "@xstate/react";
import { selectIsPlaying } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";

export const StartStopButton: FC = () => {
	const metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
	const isPlaying = useSelector(metronomeMachineRef, selectIsPlaying);

	return (
		<SimpleButton
			onClick={() =>
				metronomeMachineRef.send({
					type: EMetronomeEvent.START_STOP_CLICK,
				})
			}
		>
			{isPlaying ? "Stop" : "Start"}
		</SimpleButton>
	);
};
