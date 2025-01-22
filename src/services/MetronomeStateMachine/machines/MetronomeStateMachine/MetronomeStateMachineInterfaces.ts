import {
	ActorLogic,
	AnyActorRef,
	MachineSnapshot,
	ParameterizedObject,
	Snapshot,
} from "xstate";
import {
	ActorRefFromLogic,
	AnyEventObject,
} from "xstate/dist/declarations/src/types";
import { TimerStateMachine } from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachine";
import { ITimerStateMachineActorLogic } from "@services/MetronomeStateMachine/actors/TimerStateMachineActor/TimerStateMachineActor";

import { EStep } from "@config/commonInterfaces";
import {
	ITimerStateMachineContext,
	TTimerStateMachineEvent,
} from "@services/MetronomeStateMachine/machines/TimerStateMachine/TimerStateMachineInterfaces";

export enum EMetronomeEvent {
	KNOB_TURN = "knob.turn",
	KNOB_CLICK = "knob.click",
	KNOB_LONG_CLICK = "knob.longClick",
	START_STOP_CLICK = "startStopButton.click",
	TICK_TRIGGER = "timer.tick",
}

export interface IKnobTurnEvent extends AnyEventObject {
	type: EMetronomeEvent.KNOB_TURN;
	value: number;
}

export interface IKnobClickEvent extends AnyEventObject {
	type: EMetronomeEvent.KNOB_CLICK;
}

export interface IKnobLongClickEvent extends AnyEventObject {
	type: EMetronomeEvent.KNOB_LONG_CLICK;
}

export interface IStartStopButtonClick extends AnyEventObject {
	type: EMetronomeEvent.START_STOP_CLICK;
}

export interface ITickTriggerEvent extends AnyEventObject {
	type: EMetronomeEvent.TICK_TRIGGER;
	step?: EStep;
}

export interface IDisplayState {
	text: string;
	blinkingDelay: number;
	blinkingChars: number[];
}

export type TMetronomeEvent =
	| IKnobTurnEvent
	| IStartStopButtonClick
	| IKnobClickEvent
	| IKnobLongClickEvent
	| ITickTriggerEvent;

export interface IMetronomeContext {
	tempo: number;
	tickTrigger: boolean;
	pattern: EStep[];
	currentStep: number;
	isPlaying: boolean;
	lastState: string;
	display: IDisplayState;
	timerStateMachineRef?: ActorRefFromLogic<typeof TimerStateMachine>;
}

export enum EStateMachineState {
	tempoState = "tempoState",
	patternState = "patternState",
	stateMenuState = "stateMenuState",
	patternChooseStepState = "patternChooseStepState",
	patternStepTypeState = "patternStepTypeState",
}

export interface IActionOpenMenu extends ParameterizedObject {
	type: "ON_OPEN_STATE_MENU";
	params: {};
}

export interface IMetronomeStateMachineActorLogic
	extends ActorLogic<Snapshot<IMetronomeContext>, TMetronomeAction> {}

// TODO: here is the problem

export type TMetronomeAction = IActionOpenMenu;
// export type TMetronomeActorLogic = ITimerStateMachineActorLogic;

export type IMetronomeMachineSnapshot = MachineSnapshot<
	IMetronomeContext,
	TMetronomeEvent,
	Record<string, AnyActorRef>,
	any,
	any,
	any,
	any,
	any
>;
