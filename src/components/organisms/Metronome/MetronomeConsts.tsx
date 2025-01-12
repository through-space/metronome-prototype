import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { CLICK_VOLUMES_MAP, DEFAULT_VOLUME } from "@config/metronomeConfig";

import { EStep } from "@config/commonInterfaces";
import { createActorContext } from "@xstate/react";
import { MetronomeStateMachine } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachine";

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
