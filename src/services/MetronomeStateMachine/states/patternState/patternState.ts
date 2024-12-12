import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { patternChooseStepState } from "@services/MetronomeStateMachine/states/patternState/states/patternChooseStepState";

export const patternState: StateNodeConfig<
	IPatternStateContext,
	TMetronomeEvent,
	never,
	TMetronomeAction,
	never,
	never,
	string,
	{},
	EventObject,
	MetaObject
> = {
	initial: "patternChooseStepState",
	on: {
		[EMetronomeEvent.KNOB_LONG_CLICK]: {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	states: {
		patternChooseStepState,
	},
	entry: assign({
		currentEditCharIndex: 0,
	}),
};
