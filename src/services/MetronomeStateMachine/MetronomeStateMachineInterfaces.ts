import { EStep } from "@hooks/useTimer/useTimerInterfaces";

export interface IKnobTurnEvent {
	type: "knob.turn";
	value: number;
}

export interface IStartStopButtonClick {
	type: "startStopButton.click";
}

export interface IMetronomeContext {
	tempo: number;
	pattern: EStep[];
	displayText: string;
	isPlaying: boolean;
}

export enum EStateMachineState {
	tempoState = "tempoState",
}
