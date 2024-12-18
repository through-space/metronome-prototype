import {
	EMetronomeEvent,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { getPatternDisplay } from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";
import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import { getNewCharIndex } from "@services/MetronomeStateMachine/states/patternState/states/patternSubstatesConsts";
import { E_DISPLAY_BLINKING_DELAYS } from "@config/MetronomeConfig";

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
	id: "patternChooseStepState",
	on: {
		[EMetronomeEvent.KNOB_CLICK]: {
			target: "#patternStepTypeState",
		},
		[EMetronomeEvent.KNOB_TURN]: {
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
	},
	states: {},
	entry: assign(({ context }) => {
		return {
			display: {
				...context.display,
				blinkingChars: [context.currentEditCharIndex],
				blinkingDelay: E_DISPLAY_BLINKING_DELAYS.LONG,
				text: getPatternDisplay({ context }).value,
			},
		};
	}),
};
