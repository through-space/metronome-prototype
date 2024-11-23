import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { CLICK_VOLUMES_MAP, DEFAULT_VOLUME } from "@config/MetronomeConfig";

export const blinkLED = (setLedTrigger: Dispatch<SetStateAction<boolean>>) => {
	setLedTrigger((prevTrigger) => !prevTrigger);
};

export const tickHandlersPrint = (step: EStep) =>
	console.log("thisstep: " + step);

const getSoundVolume = (step: EStep) => {
	return step in CLICK_VOLUMES_MAP ? CLICK_VOLUMES_MAP[step] : DEFAULT_VOLUME;
};

export const playSound = async (
	step: EStep,
	audioRef: MutableRefObject<HTMLAudioElement>,
) => {
	audioRef.current.volume = getSoundVolume(step);
	await audioRef.current.play();
};
