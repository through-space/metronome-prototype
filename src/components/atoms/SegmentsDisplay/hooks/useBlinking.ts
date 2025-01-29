import { useCallback, useEffect, useRef, useState } from "react";

export const useBlinking = (originalValue: string, blinkingDelay: number) => {
	const timeIntervalId = useRef<NodeJS.Timeout | null>(null);
	const [currentValue, setCurrentValue] = useState<string | null>(
		originalValue,
	);

	useEffect(() => {
		setCurrentValue(originalValue);
	}, [originalValue]);

	const stopBlinking = useCallback(() => {
		if (!timeIntervalId) {
			return;
		}

		clearInterval(timeIntervalId.current);
		timeIntervalId.current = null;
	}, [timeIntervalId]);

	const startBlinking = useCallback((text: string, blinkingText: string) => {
		stopBlinking();
		setCurrentValue(text);

		if (blinkingText === originalValue) {
			return;
		}

		timeIntervalId.current = setInterval(() => {
			setCurrentValue((prevValue) =>
				prevValue === text ? blinkingText : text,
			);
		}, blinkingDelay);
	}, []);

	return { startBlinking, stopBlinking, currentValue };
};
