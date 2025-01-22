import { FC } from "react";
import { SegmentsDisplay } from "@components/atoms/SegmentsDisplay/SegmentsDisplay";
import { useSelector } from "@xstate/react";
import { selectDisplayState } from "@services/MetronomeStateMachine/selectors/metronomeMachineSelectors";
import { MetronomeStateMachineContext } from "../../../context/MetronomeMachineContext/MetronomeMachineContext";

export const MetronomeDisplay: FC = () => {
	const metronomeMachineRef = MetronomeStateMachineContext.useActorRef();
	const displayState = useSelector(metronomeMachineRef, selectDisplayState);

	return (
		<SegmentsDisplay
			value={displayState.text}
			blinkingChars={displayState.blinkingChars}
			blinkingDelay={displayState.blinkingDelay}
		/>
	);
};
