import { EStep } from "@config/commonInterfaces";

export interface ITimerStateMachineContext {
	timeIntervalId: NodeJS.Timeout | null;
	tempo: number;
	currentStep?: number;
	pattern?: EStep[];
	callbacks?: (currentStep: EStep) => void;
}

export enum ETimerStateMachineEventType {
	START = "START",
	STOP = "STOP",
	SET_TEMPO = "SET_TEMPO",
	CLEAR_INTERVAL = "CLEAR_INTERVAL",
}

export interface ITimerStartEvent {
	type: ETimerStateMachineEventType.START;
}

export interface ITimerStopEvent {
	type: ETimerStateMachineEventType.STOP;
}

export interface ITimerSetTempoEvent {
	type: ETimerStateMachineEventType.START;
	tempo: number;
}

export interface ITimerClearIntervalEvent {
	type: ETimerStateMachineEventType.CLEAR_INTERVAL;
}

export type TTimerStateMachineEvent =
	| ITimerStartEvent
	| ITimerStopEvent
	| ITimerSetTempoEvent;

export enum ETimerMachineState {
	idleState = "idleState",
	playingState = "playingState",
}
