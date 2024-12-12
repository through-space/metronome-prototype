import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import {
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
		"knob.turn": {
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
		"knob.longclick": {
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
			},
		};
	}),
};
