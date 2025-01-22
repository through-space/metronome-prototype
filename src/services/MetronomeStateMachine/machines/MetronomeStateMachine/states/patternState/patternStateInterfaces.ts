import { IMetronomeContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export interface IPatternStateContext extends IMetronomeContext {
	currentEditCharIndex: number;
}
