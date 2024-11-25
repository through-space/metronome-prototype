import { EStep } from "@hooks/useTimer/useTimerInterfaces";
import { ActionFunction, ParameterizedObject } from "xstate";

export interface IKnobTurnEvent {
	type: "knob.turn";
	value: number;
}

export interface IKnobClickEvent {
	type: "knob.click";
}

export interface IKnobLongClickEvent {
	type: "knob.longclick";
}

export interface IStartStopButtonClick {
	type: "startStopButton.click";
}

export type TMetronomeEvent =
	| IKnobTurnEvent
	| IStartStopButtonClick
	| IKnobClickEvent
	| IKnobLongClickEvent;

export interface IMetronomeContext {
	tempo: number;
	pattern: EStep[];
	displayText: string;
	isPlaying: boolean;
	lastState: string;
}

export enum EStateMachineState {
	tempoState = "tempoState",
}

// export interface IActionOpenMenu extends () => {} {
// 	type: "OPEN_MENU";
// 	params: {};
// }

// export type TMetronomeAction = IActionOpenMenu;
//
//
// export interface IActionOpenMenu extends ActionObject {
// 	type: "OPEN_MENU"; // Use a specific type for better type-checking
// 	params: Record<string, unknown>; // Specify the structure of `params`
// }

// export type TActionOpenMenu = ParameterizedObject;
// export type TActionOpenMenu = {
// 	type: "OPEN_STATE_MENU";
// 	params: {
// 		context: IMetronomeContext;
// 	};
// };

export interface IActionOpenMenu extends ParameterizedObject {
	type: "ON_OPEN_STATE_MENU";
	params: {
		// context: IMetronomeContext;
	};
}

export type TMetronomeAction = never | IActionOpenMenu;
