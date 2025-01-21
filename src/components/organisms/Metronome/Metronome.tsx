import React from "react";
import { MetronomeMachineContextProvider } from "../../../context/MetronomeMachineContext/MetronomeMachineContextProvider";
import { StartStopButton } from "@components/molecules/StartStopButton/StartStopButton";
import { MetronomeDisplay } from "@components/molecules/MetronomeDisplay/MetronomeDisplay";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import { LED } from "@components/atoms/LED/LED";
import { TickAudio } from "@components/molecules/TickAudio/TickAudio";

export const Metronome = () => {
	// const [ledTrigger, setLedTrigger] = useState<boolean>(false);
	// const audioRef = useRef<HTMLAudioElement>(new Audio(DEFAULT_SOUND));
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
				<ButtonKnob />
				<LED delay={60} />
				<TickAudio />
			</MetronomeMachineContextProvider>

			{/*<LED trigger={metronomeState.context.tickTrigger} delay={60} />*/}
		</>
	);
};
