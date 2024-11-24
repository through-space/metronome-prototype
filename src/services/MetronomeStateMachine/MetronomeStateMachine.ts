import { assign, createMachine, setup, StateNodeConfig } from "xstate";
import { INIT_METRONOME_STATE } from "@services/MetronomeStateMachine/MetronomeStateMachineConsts";
import {
	EStateMachineState,
	IMetronomeContext,
	TMetronomeAction,
	TMetronomeEvent,
} from "@services/MetronomeStateMachine/MetronomeStateMachineInterfaces";
import { tempoState } from "@services/MetronomeStateMachine/states/tempoState";
import { stateMenuState } from "@services/MetronomeStateMachine/states/stateMenuState";
import { a } from "vite/dist/node/types.d-aGj9QkWt";

export const MetronomeStateMachine = createMachine(
	{
		types: {
			context: {} as IMetronomeContext,
			events: {} as TMetronomeEvent,
			// actions: {} as TMetronomeAction,
		},
		initial: EStateMachineState.tempoState,
		on: {
			"startStopButton.click": {
				actions: assign(({ context }) => {
					return {
						isPlaying: !context.isPlaying,
					};
				}),
			},
		},
		context: INIT_METRONOME_STATE,
		states: {
			tempoState,
			stateMenuState,
		},
	},
	{
		actions: {
			ON_OPEN_STATE_MENU: assign({
				lastState: ({ self }) => {
					return self.getSnapshot().value.toString();
				},
			}),
		},
	},
);
