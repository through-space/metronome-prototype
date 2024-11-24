import { assign, EventObject, MetaObject, StateNodeConfig } from "xstate";
import { getUpdatedTempo } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";

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

				// console.log(`new tempo in state ${newTempo}`);
				return {
					tempo: newTempo,
					displayText: newTempo.toString(), // Use the calculated tempo
				};
			}),
		},
		"knob.longclick": {
			target: "stateMenuState",
			actions: [{ type: "ON_OPEN_STATE_MENU" }],
			// actions: [{type: OPE}]
		},
	},
};
