import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	EStateMachineState,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IStateMenuContext } from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuInterfaces";
import {
	getAllStateOptions,
	getNextStateOptionIndex,
	getStateMenuDisplay,
} from "@services/MetronomeStateMachine/machines/MetronomeStateMachine/states/stateMenuState/stateMenuStateConsts";
import { E_DISPLAY_BLINKING_DELAYS } from "@config/metronomeConfig";

export const stateMenuState: StateNodeConfig<
	IStateMenuContext,
	TMetronomeEvent,
	never,
	never,
	never,
	never,
	string,
	never,
	EventObject,
	MetaObject
> = {
	id: EStateMachineState.stateMenuState,
	on: {
		[EMetronomeEvent.KNOB_TURN]: {
			actions: assign(({ context, event }) => {
				const allStates = getAllStateOptions();

				const nextStateIndex = getNextStateOptionIndex({
					turnValue: event.value,
					currentMenuOptionIndex: context.currentMenuOptionIndex,
					allStates: allStates,
					lastState: context.lastState,
				});

				const nextStateName = allStates[nextStateIndex];

				return {
					...context,
					display: {
						...context.display,
						text: getStateMenuDisplay(nextStateName, context).value,
					},

					currentMenuOptionIndex: nextStateIndex,
					currentStateOption: nextStateName,
				};
			}),
		},
		[EMetronomeEvent.KNOB_CLICK]: [
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
	exit: assign(({ context }) => {
		return {
			currentStateOption: "",
			currentMenuOptionIndex: undefined,
			display: { ...context.display, blinkingChars: [] },
		};
	}),
	entry: assign(({ context }) => {
		return {
			...context,
			display: {
				...context.display,
				blinkingChars: [0, 1, 2, 3],
				blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG,
			},
		};
	}),
};
