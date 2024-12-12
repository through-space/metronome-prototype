import { SegmentsDisplay } from "@components/molecules/SegmentsDisplay/SegmentsDisplay";
import React, { useRef, useState } from "react";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import {
	blinkLED,
	playSound,
} from "@components/organisms/Metronome/MetronomeConsts";
import { useTimer } from "@hooks/useTimer/useTimer";
import { LED } from "@components/atoms/LED/LED";
import { DEFAULT_SOUND } from "@config/MetronomeConfig";
import { MetronomeStateMachine } from "@services/MetronomeStateMachine/MetronomeStateMachine";
import { useMachine } from "@xstate/react";
import { StartStopButton } from "@components/atoms/StartStopButton/StartStopButton";

export const Metronome = () => {
	const [ledTrigger, setLedTrigger] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement>(new Audio(DEFAULT_SOUND));
	const [metronomeState, metronomeStateSend] = useMachine(
		MetronomeStateMachine,
	);

	useTimer({
		pattern: metronomeState.context.pattern,
		isPlaying: metronomeState.context.isPlaying,
		tempo: metronomeState.context.tempo,
		onTickHandlers: [
			// tickHandlersPrint,
			(step) => playSound(step, audioRef),
			(step) => blinkLED(setLedTrigger),
		],
	});

	console.log("metronomeStateSend", metronomeState);
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
					metronomeStateSend({ type: "startStopButton.click" })
				}
			>
				{metronomeState.context.isPlaying ? "Stop" : "Start"}
			</StartStopButton>
			<ButtonKnob
				onChange={(steps) =>
					metronomeStateSend({ type: "knob.turn", value: steps })
				}
				onClick={() => metronomeStateSend({ type: "knob.click" })}
				onLongPress={() => {
					metronomeStateSend({ type: "knob.longclick" });
				}}
			/>
			<LED trigger={ledTrigger} delay={60} />
		</>
	);
};
