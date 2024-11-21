import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import {
	CLICK_VOLUMES_MAP,
	DEFAULT_VOLUME,
	MAX_TEMPO,
	MIN_TEMPO,
} from "@config/MetronomeConfig";

export const blinkLED = (setLedTrigger: Dispatch<SetStateAction<boolean>>) => {
	setLedTrigger((prevTrigger) => !prevTrigger);
};

export const tickHandlersPrint = (step: EStep) =>
	console.log("thisstep: " + step);

export const playSound = async (
	step: EStep,
	audioRef: MutableRefObject<HTMLAudioElement>,
) => {
	audioRef.current.volume =
		step in CLICK_VOLUMES_MAP ? CLICK_VOLUMES_MAP[step] : DEFAULT_VOLUME;
	await audioRef.current.play();
};

export const updateTempo = (
	tempoIncrement: number,
	setTempo: Dispatch<SetStateAction<number>>,
) => {
	setTempo((tempo) => {
		const newTempo = tempo + tempoIncrement;
		console.log("new tempo", newTempo);
		if (newTempo > MAX_TEMPO) {
			return MAX_TEMPO;
		} else if (newTempo < MIN_TEMPO) {
			return MIN_TEMPO;
		} else {
			return newTempo;
		}
	});
};
