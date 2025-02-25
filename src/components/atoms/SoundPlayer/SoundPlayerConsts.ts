import { MutableRefObject } from "react";

export const playSound = async (
	audioRef: MutableRefObject<HTMLAudioElement | null>,
	volume: number,
) => {
	if (!audioRef || audioRef.current === null) {
		return;
	}

	audioRef.current.volume = volume;
	await audioRef.current
		.play()
		.catch((err) => console.error("Error playing audio:", err));
};
