import { useEffect, useRef, useState } from "react";
import { IUseTimerProps } from "./useTimerInterfaces";
import { INITIAL_STEP_INDEX } from "@hooks/useTimer/useTimerConsts";

export const useTimer = (props: IUseTimerProps) => {
	const { pattern, tempo, isPlaying, onTickHandlers } = props;
	const [currentStepIndex, setCurrentStepIndex] =
		useState<number>(INITIAL_STEP_INDEX);
	const timeIntervalId = useRef<NodeJS.Timeout | null>(null);

	const tick = () => {
		setCurrentStepIndex((prevStepIndex) => {
			const nextStepIndex = (prevStepIndex + 1) % pattern.length;
			const step = pattern[nextStepIndex];
			// console.log("prev: " + prevStepIndex);
			onTickHandlers &&
				onTickHandlers.forEach((handler) => handler(step));
			return nextStepIndex;
		});
	};

	const startTimer = () => {
		const timeInterval = 60000 / tempo;
		setCurrentStepIndex(INITIAL_STEP_INDEX);

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
