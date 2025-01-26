import {
	ETimerStateMachineEventType,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";
import { ITickIntervalProps } from "@services/MetronomeStateMachine/machines/TimerStateMachine/states/timerPlayingState/timerPlayingStateInterfaces";

const DEFAULT_TIME_INTERVAL = 1000;

const getTimerIntervalDelay = (tempo: number): number => {
	if (tempo <= 0) {
		return DEFAULT_TIME_INTERVAL;
	}

	return (60 * 1000) / tempo;
};

export const getTickInterval = (props: ITickIntervalProps) => {
	const { tempo, sendBack } = props;

	const delay = getTimerIntervalDelay(tempo);

	sendBack({ type: ETimerStateMachineEventType.TICK });
	return setInterval(() => {
		sendBack({ type: ETimerStateMachineEventType.TICK });
	}, delay);
};

export const INTERVAL_ACTOR_ID = "intervalActor";
