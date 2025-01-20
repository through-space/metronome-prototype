import { EStep } from "@config/commonInterfaces";
import {
	Actor,
	ActorLogic,
	ActorRef,
	AnyActorRef,
	AnyEventObject,
	CallbackActorLogic,
	MachineSnapshot,
	Snapshot,
	StateValue,
} from "xstate";
import {
	IMetronomeContext,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export interface ITimerStateMachineContext {
	timeIntervalId: NodeJS.Timeout | null;
	tempo: number;
	metronomeStateMachine: ActorRef<
		MachineSnapshot<
			IMetronomeContext,
			TMetronomeEvent,
			Record<string, AnyActorRef>,
			StateValue,
			string,
			unknown,
			any,
			any
		>,
		TMetronomeEvent,
		AnyEventObject
	> | null;
	currentStep?: number;
	pattern?: EStep[];
	callbacks?: (currentStep: EStep) => void;
}

export enum ETimerStateMachineEventType {
	START = "START",
	STOP = "STOP",
	SET_TEMPO = "SET_TEMPO",
	CLEAR_INTERVAL = "CLEAR_INTERVAL",
	TICK = "TICK",
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

// export interface ITimerClearIntervalEvent {
// 	type: ETimerStateMachineEventType.CLEAR_INTERVAL;
// }

export interface ITimerTickEvent {
	type: ETimerStateMachineEventType.TICK;
}

export type TTimerStateMachineEvent =
	| ITimerStartEvent
	| ITimerStopEvent
	| ITimerSetTempoEvent
	| ITimerTickEvent;

// export interface IIntervalCallbackActor = Actor

// export interface IIntervalStateMachineActorLogic
// 	extends ActorLogic<
// 		Snapshot<ITimerStateMachineContext>,
// 		TTimerStateMachineEvent
// 	> {}

// export interface IIntervalStateMachineActorLogic
// 	extends ActorLogic<Snapshot<{ step: EStep }>, undefined> {}

export enum ETimerMachineState {
	idleState = "idleState",
	playingState = "playingState",
}
