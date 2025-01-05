import { IMetronomeContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export interface IStateMenuContext extends IMetronomeContext {
	currentMenuOptionIndex: number;
	currentStateOption: string;
}

export interface IStateMenuDisplayProps {
	context?: IMetronomeContext;
}

export type TGetStateMenuDisplayFunc = (props: IStateMenuDisplayProps) => {
	value: string;
	blinkingChars?: number[];
};

export interface IGetNextStateOptionIndexProps {
	lastState: string;
	currentMenuOptionIndex: number;
	allStates: string[];
	turnValue: number;
}
