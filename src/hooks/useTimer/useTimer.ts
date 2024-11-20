import { useEffect, useRef, useState } from "react";
import { IUseTimerProps } from "./useTimerInterfaces";
import { INITIAL_STEP_INDEX } from "@hooks/useTimer/useTimerConsts";

export const useTimer = (props: IUseTimerProps) => {
	const { pattern, tempo, isPlaying, onTickHandlers } = props;
	const [currentStepIndex, setCurrentStepIndex] =
		useState<number>(INITIAL_STEP_INDEX);
	const timeIntervalId = useRef<NodeJS.Timeout | null>(null);

	const tick = () => {
		setCurrentStepIndex((curStepIndex) => {
			const step = pattern[curStepIndex];
			onTickHandlers &&
				onTickHandlers.forEach((handler) => handler(step));
			return (curStepIndex + 1) % pattern.length;
		});
	};

	const startTimer = () => {
		const timeInterval = 60000 / tempo;
		setCurrentStepIndex(INITIAL_STEP_INDEX);
		tick();

		timeIntervalId.current = setInterval(tick, timeInterval);
	};

	const stopTimer = () => {
		clearInterval(timeIntervalId.current);
		timeIntervalId.current = null;
	};

	useEffect(() => {
		if (isPlaying && !timeIntervalId.current) {
			startTimer();
		} else {
			stopTimer();
		}

		return () => {
			stopTimer();
		};
	}, [isPlaying, tempo, pattern]); // Depend on relevant props

	return { currentStepIndex };
};
