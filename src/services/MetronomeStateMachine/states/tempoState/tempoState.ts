import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
	EMetronomeEvent,
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import {
	getTempoDisplay,
	getUpdatedTempo,
} from "@services/MetronomeStateMachine/states/tempoState/tempoStateConsts";

export const tempoState: StateNodeConfig<
	IMetronomeContext,
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
		[EMetronomeEvent.KNOB_TURN]: {
			actions: assign(({ context, event }) => {
				const newTempo = getUpdatedTempo(context.tempo, event.value);
				return {
					...context,
					tempo: newTempo,
					display: {
						...context.display,
						text: newTempo.toString(),
					},
				};
			}),
		},
		[EMetronomeEvent.KNOB_CLICK]: {},
		[EMetronomeEvent.KNOB_LONG_CLICK]: {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
		},
	},
	entry: assign(({ context }) => {
		return {
			...context,
			display: {
				...context.display,
				text: getTempoDisplay({ context }).value,
				blinkingChars: [],
			},
		};
	}),
};
