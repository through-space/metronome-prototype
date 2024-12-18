import {
	EMetronomeEvent,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { IPatternStateContext } from "@services/MetronomeStateMachine/states/patternState/patternStateInterfaces";
import { getPatternDisplay } from "@services/MetronomeStateMachine/states/patternState/patternStateConsts";
import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import { getNextStep } from "@services/MetronomeStateMachine/states/patternState/states/patternSubstatesConsts";
import { E_DISPLAY_BLINKING_DELAYS } from "@config/MetronomeConfig";

export const patternStepTypeState: StateNodeConfig<
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
	id: "patternStepTypeState",
	on: {
		[EMetronomeEvent.KNOB_CLICK]: {
			target: "#patternChooseStepState",
		},
		[EMetronomeEvent.KNOB_TURN]: {
			actions: [
				assign(({ context, event }) => {
					const curStepType =
						context.pattern[context.currentEditCharIndex];
					const nextStepType = getNextStep(curStepType, event);
					const newPattern = context.pattern;
					newPattern[context.currentEditCharIndex] = nextStepType;

					return {
						...context,
						// pattern: newPattern,
						display: {
							...context.display,
							text: getPatternDisplay({ context }).value,
						},
					};
					// const newEditCharIndex = getNewCharIndex(context, event);
					//
					// return {
					// 	...context,
					// 	currentEditCharIndex: newEditCharIndex,
					// 	display: {
					// 		...context.display,
					// 		blinkingChars: [newEditCharIndex],
					// 	},
					// };
				}),
			],
		},
	},
	states: {},
	entry: assign(({ context }) => {
		return {
			...context,
			display: {
				...context.display,
				blinkingDelay: E_DISPLAY_BLINKING_DELAYS.SHORT,
			},
		};
	}),
};
