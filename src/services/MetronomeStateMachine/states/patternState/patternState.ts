import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
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
		"knob.longclick": {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	states: {
		patternChooseStepState,
	},
	entry: assign({
		currentEditCharIndex: 0,
		// blinkingChars: [0],
		// displayText: getPatternDisplay({ context }).value,
	}),
};
