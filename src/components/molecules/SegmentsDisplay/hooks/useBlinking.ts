import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const useBlinking = (blinkingDelay: number) => {
	const timeIntervalId = useRef<NodeJS.Timeout | null>(null);

	const stopBlinking = () => {
		clearInterval(timeIntervalId.current);
		timeIntervalId.current = null;
	};

	const startBlinking = (
		blinkingText: string,
		originalValue: string,
		setCurrentValue: Dispatch<SetStateAction<string>>,
	) => {
		stopBlinking();
		timeIntervalId.current = setInterval(() => {
			setCurrentValue((prevValue) =>
				prevValue === originalValue ? blinkingText : originalValue,
			);
		}, blinkingDelay);
	};

	return { startBlinking, stopBlinking };
};
