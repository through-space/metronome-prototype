import { IMetronomeContext } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export interface IPatternStateContext extends IMetronomeContext {
	currentEditCharIndex: number;
}
