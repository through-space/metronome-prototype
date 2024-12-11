import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import {
	getNewCharIndex,
	getPatternDisplay,
} from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";

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
	on: {
		"knob.turn": {
			actions: [
				assign(({ context, event }) => {
					const newEditCharIndex = getNewCharIndex(context, event);

					return {
						currentEditCharIndex: newEditCharIndex,
						blinkingChars: [newEditCharIndex],
					};
				}),
			],
		},
		"knob.click": {
			actions: [],
		},
		"knob.longclick": {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	states: {},
	entry: assign(({ context }) => {
		return {
			currentEditCharIndex: 0,
			blinkingChars: [0],
			displayText: getPatternDisplay({ context }).value,
		};
	}),
};
