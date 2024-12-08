import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const useBlinking = (originalValue: string, blinkingDelay: number) => {
	const timeIntervalId = useRef<NodeJS.Timeout | null>(null);
	const [currentValue, setCurrentValue] = useState<string | null>(
		originalValue,
	);

	useEffect(() => {
		setCurrentValue(originalValue);
	}, [originalValue]);

	const stopBlinking = () => {
		clearInterval(timeIntervalId.current);
		timeIntervalId.current = null;
	};

	const startBlinking = (blinkingText: string) => {
		stopBlinking();
		setCurrentValue(originalValue);

		if (blinkingText === originalValue) {
			return;
		}

		timeIntervalId.current = setInterval(() => {
			setCurrentValue((prevValue) =>
				prevValue === originalValue ? blinkingText : originalValue,
			);
		}, blinkingDelay);
	};

	return { startBlinking, stopBlinking, currentValue };
};
