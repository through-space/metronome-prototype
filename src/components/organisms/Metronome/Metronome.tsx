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

	return (
		<>
			<SegmentsDisplay value={"a1b2"} />
			<button
				onClick={() =>
					metronomeStateSend({ type: "startStopButton.click" })
				}
			>
				{metronomeState.context.isPlaying ? "Stop" : "Start"}
			</button>
			<LED trigger={ledTrigger} delay={60} />
			<ButtonKnob
				onChange={(steps) =>
					metronomeStateSend({ type: "knob.turn", value: steps })
				}
				onClick={() => {}}
			/>
		</>
	);
};
