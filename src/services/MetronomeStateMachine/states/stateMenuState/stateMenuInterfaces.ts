import {
	IKnobTurnEvent,
	IMetronomeContext,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { getNextStateOptionIndex } from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuStateConsts";

export interface IStateMenuContext extends IMetronomeContext {
	currentMenuOptionIndex: number;
	currentStateOption: string;
}

export interface IStateMenuDisplayProps {
	context?: IMetronomeContext;
}

export type TGetStateMenuDisplayFunc = (
	props: IStateMenuDisplayProps,
) => string;

export interface IGetNextStateOptionIndexProps {
	lastState: string;
	currentMenuOptionIndex: number;
	allStates: string[];
	turnValue: number;
}
