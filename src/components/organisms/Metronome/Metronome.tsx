import React, { useRef } from "react";
import { DEFAULT_SOUND } from "@config/metronomeConfig";
import { MetronomeMachineContextProvider } from "../../../context/MetronomeMachineContext/MetronomeMachineContextProvider";
import { StartStopButton } from "@components/molecules/StartStopButton/StartStopButton";

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
				<StartStopButton />
				<div>Test Re-Rendering</div>
				{/*<div>State1: {metronomeState.value.toString()}</div>*/}
				{/*<SegmentsDisplay*/}
				{/*	value={metronomeState.context.display.text}*/}
				{/*	blinkingChars={metronomeState.context.display.blinkingChars}*/}
				{/*	blinkingDelay={metronomeState.context.display.blinkingDelay}*/}
				{/*/>*/}
			</MetronomeMachineContextProvider>
			{/*<ButtonKnob*/}
			{/*	onChange={(steps) =>*/}
			{/*		metronomeStateSend({*/}
			{/*			type: EMetronomeEvent.KNOB_TURN,*/}
			{/*			value: steps,*/}
			{/*		})*/}
			{/*	}*/}
			{/*	onClick={() =>*/}
			{/*		metronomeStateSend({ type: EMetronomeEvent.KNOB_CLICK })*/}
			{/*	}*/}
			{/*	onLongPress={() => {*/}
			{/*		metronomeStateSend({*/}
			{/*			type: EMetronomeEvent.KNOB_LONG_CLICK,*/}
			{/*		});*/}
			{/*	}}*/}
			{/*/>*/}
			{/*<LED trigger={metronomeState.context.tickTrigger} delay={60} />*/}
		</>
	);
};
