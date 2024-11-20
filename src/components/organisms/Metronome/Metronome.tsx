import { SegmentsDisplay } from "@components/molecules/SegmentsDisplay/SegmentsDisplay";
import React, { useRef, useState } from "react";
import { ButtonKnob } from "@components/molecules/ButtonKnob/ButtonKnob";
import {
	CLICK_VOLUMES_MAP,
	DEFAULT_PATTERN,
	DEFAULT_SOUND,
	DEFAULT_TEMPO,
	DEFAULT_VOLUME,
	MAX_TEMPO,
	MIN_TEMPO,
} from "@components/organisms/Metronome/MetronomeConsts";
import { useTimer } from "@hooks/useTimer/useTimer";

export const Metronome = () => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [tempo, setTempo] = useState<number>(DEFAULT_TEMPO);
	const audioRef = useRef<HTMLAudioElement>(new Audio(DEFAULT_SOUND));

	const handleKnobOnChange = (steps: number) => {
		updateTempo(steps);
	};

	const handleKnobClick = () => {
		console.log("Clicked");
	};

	//TODO export to const
	const updateTempo = (tempoIncrement: number) => {
		const newTempo = tempo + tempoIncrement;
		if (newTempo > MAX_TEMPO) {
			setTempo(MAX_TEMPO);
		} else if (newTempo < MIN_TEMPO) {
			setTempo(MIN_TEMPO);
		} else {
			setTempo(newTempo);
		}
	};

	const tickHandlersPrint = (step) => console.log("thisstep: " + step);
	const playSound = async (step) => {
		audioRef.current.volume =
			step in CLICK_VOLUMES_MAP
				? CLICK_VOLUMES_MAP[step]
				: DEFAULT_VOLUME;
		await audioRef.current.play();
	};

	useTimer({
		pattern: DEFAULT_PATTERN,
		isPlaying: isPlaying,
		tempo: tempo,
		onTickHandlers: [tickHandlersPrint, playSound],
	});

	return (
		<>
			<SegmentsDisplay value={"a1b2"} />
			<button onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? "Stop" : "Start"}
			</button>
			<ButtonKnob
				onChange={handleKnobOnChange}
				onClick={handleKnobClick}
			/>
		</>
	);
};
