import React, { useRef } from "react";
import { DEFAULT_SOUND } from "@config/metronomeConfig";
import { MetronomeMachineContextProvider } from "../../../context/MetronomeMachineContext/MetronomeMachineContextProvider";
import { StartStopButton } from "@components/molecules/StartStopButton/StartStopButton";
import { SegmentsDisplay } from "@components/atoms/SegmentsDisplay/SegmentsDisplay";
import { MetronomeDisplay } from "@components/molecules/MetronomeDisplay/MetronomeDisplay";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import { LED } from "@components/atoms/LED/LED";

export const Metronome = () => {
	// const [ledTrigger, setLedTrigger] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement>(new Audio(DEFAULT_SOUND));
	// const [metronomeState, metronomeStateSend] = useMachine(
	// 	MetronomeStateMachine,
	// );

	// const machineRef = MetronomeStateMachineContext.useActorRef();

	// const isPlaying = useSelector(
	// 	machineRef,
	// 	(snapshot) => snapshot.context.isPlaying,
	// );

	// const actorRef = useActorRef(MetronomeStateMachine);
	// const isPlaying = useSelector(actorRef, selectIsPlaying);
	/**
	 *
	useTimer_remove({
		pattern: metronomeState.context.pattern,
		isPlaying: metronomeState.context.isPlaying,
		tempo: metronomeState.context.tempo,
		onTickHandlers: [
			// tickHandlersPrint,
			(step) => playSound(step, audioRef),
			(step) => blinkLED(setLedTrigger),
		],
	});
	 */

	return (
		<>
			<MetronomeMachineContextProvider>
				<MetronomeDisplay />
				<StartStopButton />
				<div>Test Re-Rendering</div>
				<ButtonKnob />
				<LED delay={60} />
			</MetronomeMachineContextProvider>

			{/*<LED trigger={metronomeState.context.tickTrigger} delay={60} />*/}
		</>
	);
};
