import { EStep } from "@config/commonInterfaces";
import { TTimerStateMachineEvent } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";

// export interface ITimerClearIntervalEvent {
// 	type: ETimerStateMachineEventType.CLEAR_INTERVAL;
// }

// export type TTimerPlayingStateEvent = ITimerClearIntervalEvent;

export type onTickHandler = (step: EStep) => void;

export interface ITimerIntervalProps {
	onTickHandler?: onTickHandler | onTickHandler[];
	tempo: number;
}

export enum EIntervalActorEventType {
	RESTART,
}

export interface IIntervalActorRestartEvent {
	type: EIntervalActorEventType.RESTART;
}

export type TIntervalActorEvent = IIntervalActorRestartEvent;

export interface ITickIntervalProps {
	sendBack: (event: TTimerStateMachineEvent) => void;
	tempo: number;
}

// export interface ITimerTickEvent extends EventObject {
// 	type: ETimerStateMachineEventType.TICK;
// }
//
// export interface ITimerStopEvent extends EventObject {
// 	type: ETimerStateMachineEventType.STOP;
// }

// export type TTimerPlayingStateEvent = ITimerTickEvent | ITimerStopEvent;
//
// export interface ITimerIntervalCallbackInput extends NonReducibleUnknown {
// 	tempo: number;
// }

// export interface IIntervalStateMachineActorLogic
// 	extends CallbackActorLogic<
// 		TTimerPlayingStateEvent,
// 		ITimerIntervalCallbackInput
// 	> {}
