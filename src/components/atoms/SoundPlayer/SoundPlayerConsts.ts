import { MutableRefObject } from "react";

export const playSound = async (
	audioRef: MutableRefObject<HTMLAudioElement>,
	volume: number,
) => {
	audioRef.current.volume = volume;
	await audioRef.current
		.play()
		.catch((err) => console.error("Error playing audio:", err));
};
