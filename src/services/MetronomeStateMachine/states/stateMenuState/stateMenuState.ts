import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import { TMetronomeEvent } from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IStateMenuContext } from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";
import {
	getAllStateOptions,
	getNextStateOptionIndex,
	getStateMenuDisplay,
} from "@services/MetronomeStateMachine/states/stateMenuState/stateMenuStateConsts";

export const stateMenuState: StateNodeConfig<
	IStateMenuContext,
	TMetronomeEvent,
	never,
	never,
	never,
	never,
	string,
	{},
	EventObject,
	MetaObject
> = {
	on: {
		"knob.turn": {
			actions: assign(({ context, event, self }) => {
				const allStates = getAllStateOptions();

				const nextStateIndex = getNextStateOptionIndex({
					turnValue: event.value,
					currentMenuOptionIndex: context.currentMenuOptionIndex,
					allStates: allStates,
					lastState: context.lastState,
				});

				const nextStateName = allStates[nextStateIndex];

				return {
					displayText: getStateMenuDisplay(nextStateName, context)
						.value,
					blinkingChars: [],
					currentMenuOptionIndex: nextStateIndex,
					currentStateOption: nextStateName,
				};
			}),
		},
		"knob.click": [
			{
				guard: ({ context }) =>
					context.currentStateOption === "tempoState",
				target: "tempoState",
			},
			{
				guard: ({ context }) =>
					context.currentStateOption === "patternState",
				target: "patternState",
			},
		],
	},
	exit: assign({ currentStateOption: "", currentMenuOptionIndex: undefined }),
};
