import { ITimerIntervalProps } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";

import { EStep } from "@config/commonInterfaces";

const DEFAULT_TIME_INTERVAL = 1000;

const getTimerIntervalDelay = (tempo: number): number => {
	if (tempo <= 0) {
		return DEFAULT_TIME_INTERVAL;
	}

	return (60 * 1000) / tempo;
};

export const getTimerInterval = ({
	tempo,
	onTickHandler,
}: ITimerIntervalProps): NodeJS.Timeout => {
	const delay = getTimerIntervalDelay(tempo);

	const handlers = Array.isArray(onTickHandler)
		? onTickHandler
		: onTickHandler
			? [onTickHandler]
			: [];

	return setInterval(() => {
		// sendParent({ type: "ACTION1", data: "Updated by child" });
		if (handlers) {
			handlers.forEach((handler) => {
				handler(EStep.LOW);
			});
		}
	}, delay);
};

export const INTERVAL_ACTOR_ID = "intervalActor";
