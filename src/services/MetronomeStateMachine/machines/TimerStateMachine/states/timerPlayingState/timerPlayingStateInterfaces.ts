import { ETimerStateMachineEventType } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";

import { EStep } from "@config/commonInterfaces";

export interface ITimerClearIntervalEvent {
	type: ETimerStateMachineEventType.CLEAR_INTERVAL;
}

export type TTimerPlayingStateEvent = ITimerClearIntervalEvent;

export type onTickHandler = (step: EStep) => void;

export interface ITimerIntervalProps {
	onTickHandler?: onTickHandler | onTickHandler[];
	tempo: number;
}
