import { FC, useEffect, useRef } from "react";
import { ISoundPlayerProps } from "@components/atoms/SoundPlayer/SoundPlayerInterfaces";

export const SoundPlayer: FC<ISoundPlayerProps> = ({
	getVolume,
	getAudioFile,
	trigger,
}) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const isFirstRender = useRef(true);

	useEffect(() => {
		audioRef.current = new Audio(getAudioFile());
		return () => {
			audioRef.current?.pause(); // Cleanup: Stop audio when unmounting
			audioRef.current = null;
		};
	}, [getAudioFile]);

	useEffect(() => {
		if (!audioRef.current) {
			return;
		}

		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		audioRef.current.volume = getVolume();
		audioRef.current
			.play()
			.catch((err) => console.error("Error playing sound:", err));
	}, [trigger, getVolume]);

	return null;
};
