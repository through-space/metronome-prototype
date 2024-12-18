import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { ParameterizedObject } from "xstate";

export enum EMetronomeEvent {
	KNOB_TURN = "knob.turn",
	KNOB_CLICK = "knob.click",
	KNOB_LONG_CLICK = "knob.longClick",
	START_STOP_CLICK = "startStopButton.click",
	TICK_TRIGGER = "timer.tick",
}

export interface IKnobTurnEvent {
	type: EMetronomeEvent.KNOB_TURN;
	value: number;
}

export interface IKnobClickEvent {
	type: EMetronomeEvent.KNOB_CLICK;
}

export interface IKnobLongClickEvent {
	type: EMetronomeEvent.KNOB_LONG_CLICK;
}

export interface IStartStopButtonClick {
	type: EMetronomeEvent.START_STOP_CLICK;
}

export interface ITickTriggerEvent {
	type: EMetronomeEvent.TICK_TRIGGER;
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
	isPlaying: boolean;
	lastState: string;
	display: IDisplayState;
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
	params: {
		// context: IMetronomeContext;
	};
}

export type TMetronomeAction = never | IActionOpenMenu;
