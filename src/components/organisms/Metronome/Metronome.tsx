import { SegmentsDisplay } from "@components/molecules/SegmentsDisplay/SegmentsDisplay";
import React, { useRef } from "react";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import { LED } from "@components/atoms/LED/LED";
import { DEFAULT_SOUND } from "@config/metronomeConfig";
import { MetronomeStateMachine } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachine";
import { useMachine } from "@xstate/react";
import { StartStopButton } from "@components/atoms/StartStopButton/StartStopButton";
import { EMetronomeEvent } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export const Metronome = () => {
	// const [ledTrigger, setLedTrigger] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement>(new Audio(DEFAULT_SOUND));
	const [metronomeState, metronomeStateSend] = useMachine(
		MetronomeStateMachine,
	);

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
			<div>State1: {metronomeState.value.toString()}</div>
			<SegmentsDisplay
				value={metronomeState.context.display.text}
				blinkingChars={metronomeState.context.display.blinkingChars}
				blinkingDelay={metronomeState.context.display.blinkingDelay}
			/>
			<StartStopButton
				onClick={() =>
					metronomeStateSend({
						type: EMetronomeEvent.START_STOP_CLICK,
					})
				}
			>
				{metronomeState.context.isPlaying ? "Stop" : "Start"}
			</StartStopButton>
			<ButtonKnob
				onChange={(steps) =>
					metronomeStateSend({
						type: EMetronomeEvent.KNOB_TURN,
						value: steps,
					})
				}
				onClick={() =>
					metronomeStateSend({ type: EMetronomeEvent.KNOB_CLICK })
				}
				onLongPress={() => {
					metronomeStateSend({
						type: EMetronomeEvent.KNOB_LONG_CLICK,
					});
				}}
			/>
			<LED trigger={false} delay={60} />
		</>
	);
};
