import { assign, StateNodeConfig, transition } from "xstate";
import { getUpdatedTempo } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { stateMenuState } from "@services/MetronomeStateMachine/states/stateMenuState";

export const tempoState2test: StateNodeConfig<
	IMetronomeContext,
	TMetronomeEvent,
	any,
	TMetronomeAction,
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
		"knob.longclick": {
			target: "stateMenuState",
		},
	},
};
