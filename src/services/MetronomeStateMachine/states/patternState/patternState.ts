import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { getTempoDisplay } from "@services/MetronomeStateMachine/states/tempoState/tempoStateConsts";
import { getPatternDisplay } from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";

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
					const newEditCharIndex = Math.abs(
						(context.currentEditCharIndex + event.value) %
							context.pattern.length,
					);

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
	entry: assign(({ context }) => {
		return {
			currentEditCharIndex: 0,
			blinkingChars: [0],
			displayText: getPatternDisplay(context.pattern),
		};
	}),
};
