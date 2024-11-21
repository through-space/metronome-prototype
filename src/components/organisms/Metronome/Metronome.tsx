import { SegmentsDisplay } from "@components/molecules/SegmentsDisplay/SegmentsDisplay";
import React, { useRef, useState } from "react";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import {
	blinkLED,
	DEFAULT_PATTERN,
	DEFAULT_SOUND,
	DEFAULT_TEMPO,
	playSound,
	updateTempo,
} from "@components/organisms/Metronome/MetronomeConsts";
import { useTimer } from "@hooks/useTimer/useTimer";
import { LED } from "@components/atoms/LED/LED";
import { createMachine } from "xstate";

export const Metronome = () => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [tempo, setTempo] = useState<number>(DEFAULT_TEMPO);
	const [ledTrigger, setLedTrigger] = useState<boolean>(false);
	const audioRef = useRef<HTMLAudioElement>(new Audio(DEFAULT_SOUND));
	const [displayText, setDisplayText] = useState<boolean>(false);

	const handleKnobOnChange = (steps: number) => {
		updateTempo(steps, setTempo);
	};

	const handleKnobClick = () => {
		console.log("Clicked");
	};

	useTimer({
		pattern: DEFAULT_PATTERN,
		isPlaying: isPlaying,
		tempo: tempo,
		onTickHandlers: [
			// tickHandlersPrint,
			(step) => playSound(step, audioRef),
			(step) => blinkLED(setLedTrigger),
		],
	});

	return (
		<>
			<SegmentsDisplay value={"a1b2"} />
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? "Stop" : "Start"}
			</button>
			<LED trigger={ledTrigger} delay={60} />
			<ButtonKnob
				onChange={handleKnobOnChange}
				onClick={handleKnobClick}
			/>
		</>
	);
};
