import {
	EStateMachineState,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import {
	getNewCharIndex,
	getPatternDisplay,
} from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";
import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";

export const patternChooseStepState: StateNodeConfig<
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
						...context,
						currentEditCharIndex: newEditCharIndex,
						display: {
							...context.display,
							blinkingChars: [newEditCharIndex],
						},
					};
				}),
			],
		},
		// "knob.click": {
		// 	actions: [],
		// },
		// "knob.longclick": {
		// 	target: EStateMachineState.patternState,
		// 	actions: [{ type: "ON_OPEN_STATE_MENU" }],
		// },
	},
	states: {},
	entry: assign(({ context }) => {
		return {
			currentEditCharIndex: 0,
			display: {
				...context.display,
				blinkingChars: [0],
				text: getPatternDisplay({ context }).value,
			},
		};
	}),
};
