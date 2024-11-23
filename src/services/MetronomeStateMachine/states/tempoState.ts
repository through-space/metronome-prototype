import { assign, StateNodeConfig } from "xstate";
import { getUpdatedTempo } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	IMetronomeContext,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";

export const tempoState: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
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
	},
};
